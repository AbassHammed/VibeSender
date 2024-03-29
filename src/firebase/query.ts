import { Dispatch, SetStateAction } from 'react';

import { friendRequestData, Message, SessionData, User } from '@/types';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { firestore } from './firebase';

const currentUserQuery = async (
  userId: string,
  setSessionData: Dispatch<SetStateAction<SessionData | null>>,
) => {
  const userQuery = query(collection(firestore, 'users'), where('uid', '==', userId));
  const querySnapshot = await getDocs(userQuery);

  if (querySnapshot.empty) {
    return;
  }

  const userData = querySnapshot.docs[0].data() as DocumentData;

  setSessionData((prevSessionData): SessionData | null => {
    // If there's no previous session data, we opt to return a default structure or null
    if (!prevSessionData) {
      return {
        currentUser: {
          uid: userData.uid,
          email: userData.email,
          fullName: userData.fullName,
          userName: userData.userName,
          jobDescription: userData.jobDescription,
          bio: userData.bio,
          lang: userData.lang,
          isOnline: userData.isOnline,
          status: userData.color,
          following: userData.following,
          dateBirth: userData.dateBirth,
          streetName: userData.streetName,
          postalCode: userData.postalCode,
          stateprovince: userData.stateprovince,
          country: userData.country,
          imageUrl: userData.imageUrl,
          createdAt: userData.createdAt,
          deletedAt: userData.deletedAt,
          lastSeen: {
            date: userData.lastSeen.date,
            time: userData.lastSeen.time,
          },
        },
      };
    }

    // If there is previous session data, update it accordingly
    return {
      ...prevSessionData,
      currentUser: {
        ...prevSessionData.currentUser,
        uid: userData.uid,
        email: userData.email,
        fullName: userData.fullName,
        userName: userData.userName,
        jobDescription: userData.jobDescription,
        bio: userData.bio,
        lang: userData.lang,
        isOnline: userData.isOnline,
        status: userData.color,
        following: userData.following,
        dateBirth: userData.dateBirth,
        streetName: userData.streetName,
        postalCode: userData.postalCode,
        stateprovince: userData.stateprovince,
        country: userData.country,
        imageUrl: userData.imageUrl,
        createdAt: userData.createdAt,
        deletedAt: userData.deletedAt,
        lastSeen: {
          date: userData.lastSeen.date,
          time: userData.lastSeen.time,
        },
      },
    };
  });
};

const UserQuery = async (userId: string) => {
  const userQuery = query(collection(firestore, 'users'), where('uid', '==', userId));
  const querySnapshot = await getDocs(userQuery);

  if (querySnapshot.empty) {
    return;
  }

  return querySnapshot.docs[0].data() as User;
};

// Function to search users based on userName
const searchRequest = async (
  filterValue: string,
  setSessionData: Dispatch<SetStateAction<SessionData | null>>,
) => {
  // Direct search in users collection
  const usersQuery = query(
    collection(firestore, 'users'),
    where('userName', '>=', filterValue),
    where('userName', '<=', `${filterValue}\uf8ff`),
  );
  const usersSnapshot = await getDocs(usersQuery);

  const users = usersSnapshot.docs.map(doc => ({ ...(doc.data() as User) }));
  setSessionData(prev => ({ ...prev, searchedUsers: users }));
};

const sendFriendRequest = async (receiverId: string, senderId: string, senderUserName: string) => {
  const requestId = [receiverId, senderId].sort().join('_');
  const friendRequestData = {
    id: requestId,
    senderId,
    receiverId,
    senderUserName,
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(firestore, 'friendRequests', requestId), friendRequestData);
};

const searchFriendRequest = async (userID: string) => {
  const requestsQuery = query(
    collection(firestore, 'friendRequests'),
    where('receiverId', '==', userID),
  );

  const querySnapshot = await getDocs(requestsQuery);
  const friendRequests = querySnapshot.docs.map(doc => ({ ...(doc.data() as friendRequestData) }));

  return friendRequests;
};

const searchFriendInRequest = async (senderId: string, receiverId: string) => {
  const requestQuery = query(
    collection(firestore, 'friendRequests'),
    where('receiverId', '==', receiverId),
    where('senderId', '==', senderId),
  );

  const querySnapshot = await getDocs(requestQuery);

  if (querySnapshot.docs.length === 0) {
    return null;
  }

  const friendInRequest = querySnapshot.docs[0].data() as friendRequestData;
  return friendInRequest;
};

const acceptFriendRequest = async (requestId: string, senderId: string, receiverId: string) => {
  await runTransaction(firestore, async transaction => {
    const friendRequestRef = doc(firestore, 'friendRequests', requestId);
    const newFriendRef = doc(firestore, 'friends', requestId);
    transaction.delete(friendRequestRef);
    transaction.set(newFriendRef, {
      userId1: senderId,
      userId2: receiverId,
      createdAt: serverTimestamp(),
    });
  });
};

const declineFriendRequest = async (requestId: string) => {
  const requestRef = doc(firestore, 'friendRequests', requestId);
  await deleteDoc(requestRef);
};

const checkFriendshipStatus = async (userId1: string, userId2: string) => {
  const docId = [userId1, userId2].sort().join('_');
  const docRef = doc(firestore, 'friends', docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

const getMessages = async (conversationId: string) => {
  const messagesCollection = collection(firestore, `conversations/${conversationId}/messages`);
  const q = query(messagesCollection, orderBy('timestamp', 'asc')); // assuming you want to order by timestamp

  const querySnapshot = await getDocs(q);

  const messages = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      userId: data.userId,
      message: data.message,
      timestamp: data.timestamp.toDate(), // Convert Firestore Timestamp to JavaScript Date object
      read: data.read,
      type: data.type,
    } as Message; // Cast the data to the Message type
  });

  return messages;
};

async function updateUserOnlineStatus(userId: string, isOnline: boolean) {
  const userDocRef = doc(firestore, 'users', userId);
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  await updateDoc(userDocRef, {
    isOnline,
    lastSeen: {
      date: currentTime.toISOString().split('T')[0],
      time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
    },
  });
}

async function setupUserActivityMonitoring(userId: string) {
  let inactivityTimer: NodeJS.Timeout;

  const markUserAsOffline = async () => await updateUserOnlineStatus(userId, false);
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(markUserAsOffline, 60000);
  };

  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'hidden') {
      await markUserAsOffline();
    } else {
      await updateUserOnlineStatus(userId, true);
      resetInactivityTimer();
    }
  });

  window.addEventListener('focus', async () => {
    await updateUserOnlineStatus(userId, true);
    resetInactivityTimer();
  });

  document.addEventListener('mousemove', resetInactivityTimer);
  document.addEventListener('keypress', resetInactivityTimer);

  resetInactivityTimer();
}

export {
  updateUserOnlineStatus,
  setupUserActivityMonitoring,
  getMessages,
  UserQuery,
  searchFriendInRequest,
  checkFriendshipStatus,
  declineFriendRequest,
  acceptFriendRequest,
  searchFriendRequest,
  sendFriendRequest,
  currentUserQuery,
  searchRequest,
};
