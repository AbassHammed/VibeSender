import { conversation, friendship, FriendshipStatus, Message } from '@/types';

export const placeholderUrl =
  'https://firebasestorage.googleapis.com/v0/b/vibesend.appspot.com/o/placeholder.png?alt=media&token=528c1462-789b-4382-ba4e-b54cc4d478f9';

export const friends = [
  {
    id: 1,
    recieverId: 'vhmlvbuijlbdbciubfeqiybvliulbqviue',
    senderId: 'oiherqubibmavbibrmioeuionuariu',
    senderUserName: 'AbassHammed',
    requestId: 'vhmlvbuijlbdbciubfeqiybvliulbqviue_oiherqubibmavbibrmioeuionuariu',
  },
  {
    id: 2,
    recieverId: 'eqyblvulibvliuybqvieubciubldbjvlhm',
    senderId: 'nuariuoiherqubrmioeibmavbibuibmav',
    senderUserName: 'JaneDoe',
    requestId: 'eqyblvulibvliuybqvieubciubldbjvlhm_nuariuoiherqubrmioeibmavbibuibmav',
  },
  {
    id: 3,
    recieverId: 'cubfeqiybvhmlvbuilbqviueijlbdbciu',
    senderId: 'bibuibmavoiherqunumavbibrmioeuariu',
    senderUserName: 'JohnSmith',
    requestId: 'cubfeqiybvhmlvbuilbqviueijlbdbciu_bibuibmavoiherqunumavbibrmioeuariu',
  },
  {
    id: 4,
    recieverId: 'liulbqviuevhmlvbuijlbdbciubfeqiybv',
    senderId: 'ionuariuoiherqubibmavbibrmioeu',
    senderUserName: 'AliceJones',
    requestId: 'liulbqviuevhmlvbuijlbdbciubfeqiybv_ionuariuoiherqubibmavbibrmioeu',
  },
  {
    id: 5,
    recieverId: 'bciubfeqiybvliulbqviuevhmlvbuijlbd',
    senderId: 'rmioeuionuariuoiherqubibmavbi',
    senderUserName: 'EveWilliams',
    requestId: 'bciubfeqiybvliulbqviuevhmlvbuijlbd_rmioeuionuariuoiherqubibmavbi',
  },
];

export const notificationStyles = {
  error: {
    background: 'bg-red-50 border border-red-300',
    text: 'text-red-600',
    hover: 'hover:text-red-700',
  },
  info: {
    background: 'bg-blue-50 border border-blue-300',
    text: 'text-blue-600',
    hover: 'hover:text-blue-700',
  },
  warn: {
    background: 'bg-yellow-50 border border-yellow-300',
    text: 'text-yellow-600',
    hover: 'hover:text-yellow-700',
  },
  success: {
    background: 'bg-green-50 border border-green-300',
    text: 'text-green-600',
    hover: 'hover:text-green-700',
  },
};

export const friendShipStatusStyles = {
  unfollow: {
    background: 'bg-red-50 border border-red-300',
    text: 'text-red-600',
    hover: 'hover:text-red-700',
  },
  follow: {
    background: 'bg-blue-50 border border-blue-300',
    text: 'text-blue-600',
    hover: 'hover:text-blue-700',
  },
  pending: {
    background: 'bg-yellow-50 border border-yellow-300',
    text: 'text-yellow-600',
    hover: 'hover:text-yellow-700',
  },
  accept: {
    background: 'bg-green-50 border border-green-300',
    text: 'text-green-600',
    hover: 'hover:text-green-700',
  },
};

export const friendShipStatusStyles1: Record<FriendshipStatus, friendship> = {
  unfollow: {
    background: 'danger',
    message: 'unfollow',
    text: 'text-red-600',
  },
  follow: {
    background: 'primary',
    message: 'follow',
    text: 'text-blue-600',
  },
  pending: {
    background: 'warning',
    message: 'pending',
    text: 'text-yellow-600',
  },
  accept: {
    background: 'success',
    message: 'accept',
    text: 'text-green-600',
  },
};

export const mockConversations: conversation[] = [
  {
    conversationId: 'conv1',
    participants: ['qUOBTPeDzATjJSw0yUjgccihtgE2', 'UXhZLccNMGePKBygptto8fqlFV63'],
    lastMessage: {
      userId: 'qUOBTPeDzATjJSw0yUjgccihtgE2',
      message: 'Hey, are we still on for tomorrow?',
      timestamp: '2024-03-10T15:00:00Z',
      read: false,
      type: 'text',
    },
    lastUpdate: '2024-03-10T15:00:00Z',
  },
  {
    conversationId: 'conv2',
    participants: ['qUOBTPeDzATjJSw0yUjgccihtgE2', 'UXhZLccNMGePKBygptto8fqlFV63'],
    lastMessage: {
      userId: 'UXhZLccNMGePKBygptto8fqlFV63',
      message: 'Just sent the documents. Let me know if you need any changes.',
      timestamp: '2024-03-09T12:30:00Z',
      read: true,
      type: 'text',
    },
    lastUpdate: '2024-03-09T12:30:00Z',
  },
  {
    conversationId: 'conv3',
    participants: ['qUOBTPeDzATjJSw0yUjgccihtgE2', 'UXhZLccNMGePKBygptto8fqlFV63'],
    lastMessage: {
      userId: 'qUOBTPeDzATjJSw0yUjgccihtgE2',
      message: 'Loved the photos from the trip!',
      timestamp: '2024-03-08T09:20:00Z',
      read: true,
      type: 'text',
    },
    lastUpdate: '2024-03-08T09:20:00Z',
  },
];

const mockMessages: Message[] = [
  {
    userId: 'qUOBTPeDzATjJSw0yUjgccihtgE2',
    message: 'Hey, how are you?',
    timestamp: '2024-03-10T08:00:00Z',
    read: true,
    type: 'text',
  },
  {
    userId: 'UXhZLccNMGePKBygptto8fqlFV63',
    message: "I'm good, thanks! Working on the project we talked about. How about you?",
    timestamp: '2024-03-10T08:02:00Z',
    read: true,
    type: 'text',
  },
  {
    userId: 'qUOBTPeDzATjJSw0yUjgccihtgE2',
    message: 'Pretty much the same here. Just trying to catch up with my tasks.',
    timestamp: '2024-03-10T08:05:00Z',
    read: false,
    type: 'text',
  },
  {
    userId: 'UXhZLccNMGePKBygptto8fqlFV63',
    message: 'Do you want to meet later and go through the project together?',
    timestamp: '2024-03-10T08:10:00Z',
    read: false,
    type: 'text',
  },
  {
    userId: 'qUOBTPeDzATjJSw0yUjgccihtgE2',
    message: "Sure, that sounds like a plan. Let's say around 3 PM?",
    timestamp: '2024-03-10T08:15:00Z',
    read: false,
    type: 'text',
  },
  {
    userId: 'UXhZLccNMGePKBygptto8fqlFV63',
    message: 'Perfect, see you then!',
    timestamp: '2024-03-10T08:16:00Z',
    read: false,
    type: 'text',
  },
];

// Export the mock data if needed elsewhere
export default mockMessages;
