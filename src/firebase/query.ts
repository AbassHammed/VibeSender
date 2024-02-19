import { Dispatch, SetStateAction } from 'react';

import { SessionData } from '@/hooks/useSession';
import { User } from '@/types';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

import { firestore } from './firebase';

export const currentUserQuery = async (
  userId: string,
  setSessionData: Dispatch<SetStateAction<SessionData | null>>,
) => {
  const userQuery = query(collection(firestore, 'users'), where('uid', '==', userId));
  const querySnapshot = await getDocs(userQuery);

  if (querySnapshot.empty) {
    return;
  }

  const userData = querySnapshot.docs[0].data();

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
          status: userData.status,
          lang: userData.lang,
          following: userData.following,
          lastSeen: userData.lastSeen,
          dateBirth: userData.dateBirth,
          streetName: userData.streetName,
          postalCode: userData.postalCode,
          stateprovince: userData.stateprovince,
          country: userData.country,
          imageUrl: userData.imageUrl,
          createdAt: userData.createdAt,
          deletedAt: userData.deletedAt,
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
        status: userData.status,
        lang: userData.lang,
        following: userData.following,
        lastSeen: userData.lastSeen,
        dateBirth: userData.dateBirth,
        streetName: userData.streetName,
        postalCode: userData.postalCode,
        stateprovince: userData.stateprovince,
        country: userData.country,
        imageUrl: userData.imageUrl,
        createdAt: userData.createdAt,
        deletedAt: userData.deletedAt,
      },
    };
  });
};

export const populateFriends = async (
  currentUserId: string,
  setSessionData: Dispatch<SetStateAction<SessionData | null>>,
) => {
  // Assume there are two separate queries due to Firestore limitations on 'OR' queries
  const friendshipsQuery1 = query(
    collection(firestore, 'friendships'),
    where('user1Id', '==', currentUserId),
  );
  const friendshipsQuery2 = query(
    collection(firestore, 'friendships'),
    where('user2Id', '==', currentUserId),
  );
  const [querySnapshot1, querySnapshot2] = await Promise.all([
    getDocs(friendshipsQuery1),
    getDocs(friendshipsQuery2),
  ]);

  // Combine the documents from both queries
  const combinedDocs = [...querySnapshot1.docs, ...querySnapshot2.docs];

  if (combinedDocs.length === 0) {
    return;
  }

  const friendIds = new Set(
    combinedDocs.map(doc => {
      const data = doc.data();
      return data.user1Id === currentUserId ? data.userId2 : data.userId1;
    }),
  );

  const friends = await Promise.all(
    Array.from(friendIds).map(async id => {
      const userDocRef = doc(firestore, 'users', id);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        return null;
      }

      // Extract userData and manually map it to the User type, including the document id
      const userData = userDoc.data();
      const friend: User = {
        uid: userData.uid,
        email: userData.email,
        fullName: userData.fullName,
        userName: userData.userName,
        jobDescription: userData.jobDescription,
        bio: userData.bio,
        status: userData.status,
        lang: userData.lang,
        following: userData.following,
        lastSeen: userData.lastSeen,
        dateBirth: userData.dateBirth,
        streetName: userData.streetName,
        postalCode: userData.postalCode,
        stateprovince: userData.stateprovince,
        country: userData.country,
        imageUrl: userData.imageUrl,
        createdAt: userData.createdAt,
        deletedAt: userData.deletedAt,
      };

      return friend;
    }),
  );

  // Filter out any null entries
  const validFriends: User[] = friends.filter((friend): friend is User => friend !== null);

  // Update the session data with the populated `friends` array
  setSessionData(prevSessionData => ({
    ...prevSessionData,
    friends: validFriends,
  }));
};

// Function to search users based on fullName, with an option to restrict search within current user's friends
export const searchRequest = async (
  filterValue: string,
  searchInFriends: boolean,
  setSessionData: Dispatch<SetStateAction<SessionData | null>>,
  currentUserId: string,
) => {
  if (searchInFriends) {
    // Query friendships to get friends' IDs
    const friendshipsQuery1 = query(
      collection(firestore, 'friendships'),
      where('user1Id', '==', currentUserId),
    );
    const friendshipsQuery2 = query(
      collection(firestore, 'friendships'),
      where('user2Id', '==', currentUserId),
    );
    const [friendsSnapshot1, friendsSnapshot2] = await Promise.all([
      getDocs(friendshipsQuery1),
      getDocs(friendshipsQuery2),
    ]);

    const combinedDocs = [...friendsSnapshot1.docs, ...friendsSnapshot2.docs];

    if (combinedDocs.length === 0) {
      return;
    }

    const friendIds = new Set(
      combinedDocs.map(doc => {
        const data = doc.data();
        return data.user1Id === currentUserId ? data.userId2 : data.userId1;
      }),
    );

    // Fetch and filter friends based on filterValue
    const friendsData = await Promise.all(
      Array.from(friendIds).map(async friendId => {
        const userDocRef = doc(firestore, 'users', friendId);
        const userDoc = await getDoc(userDocRef);
        return userDoc.exists() &&
          userDoc.data().fullName.toLowerCase().includes(filterValue.toLowerCase())
          ? { ...(userDoc.data() as User) }
          : null;
      }),
    );

    const validFriends = friendsData.filter((friend): friend is User => friend !== null);
    setSessionData(prev => ({ ...prev, searchedUsers: validFriends }));
  } else {
    // Direct search in users collection
    const usersQuery = query(
      collection(firestore, 'users'),
      where('fullName', '>=', filterValue),
      where('fullName', '<=', `${filterValue}\uf8ff`),
    );
    const usersSnapshot = await getDocs(usersQuery);

    const users = usersSnapshot.docs.map(doc => ({ ...(doc.data() as User) }));
    setSessionData(prev => ({ ...prev, searchedUsers: users }));
  }
};
