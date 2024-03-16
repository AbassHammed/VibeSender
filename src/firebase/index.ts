export { app, firestore, auth, storage } from './firebase';
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
} from './query';
