import { Dispatch, SetStateAction } from 'react';

import { SessionData } from '@/hooks';
import { User } from '@/types';
import { collection, getDocs, query, where } from 'firebase/firestore';

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

  const userData = querySnapshot.docs[0].data() as User;

  setSessionData((prevSessionData): SessionData | null => {
    // If there's no previous session data, we opt to return a default structure or null
    if (!prevSessionData) {
      return {
        currentUser: {
          ...userData,
        },
      };
    }

    // If there is previous session data, update it accordingly
    return {
      ...prevSessionData,
      currentUser: {
        ...prevSessionData.currentUser,
        ...userData,
      },
    };
  });
};

// Function to search users based on userName
export const searchRequest = async (
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
