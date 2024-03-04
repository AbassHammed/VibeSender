import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks';
import * as Dialog from '@radix-ui/react-dialog';

import { Button } from '../ui/button';

const DeleteAccount = () => {
  const [input, setInput] = useState({ email: '' });
  const [isValid, setIsValid] = useState(false);
  const { user } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const emailValid = user?.email === input.email;
    setIsValid(emailValid);
  }, [input, user?.email]);
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button type="submit" className="bg-red-600 hover:bg-red-400">
            Delete Account
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-4 w-full max-w-lg">
            <div className="bg-white dark:bg-[#141414] dark:text-white rounded-md shadow-lg px-4 py-6 sm:flex">
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <Dialog.Title className="text-lg font-medium"> Delete Account</Dialog.Title>
                <Dialog.Description className="mt-2 text-sm leading-relaxed text-gray-500">
                  <span className="font-bold">Deleting your account is permanent.</span> When you
                  delete your VibeSender account, all your data will be permanently removed.
                </Dialog.Description>
                <p>Please enter your email address to continue.</p>
                <div className="relative w-full mt-2">
                  <svg
                    className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <input
                    onChange={handleInputChange}
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div className="items-center gap-2 mt-3 text-sm sm:flex">
                  <Dialog.Close asChild>
                    <button
                      className="w-full mt-2 p-2.5 flex-1 bg-red-600 text-white rounded-md ring-offset-2 ring-red-600 focus:ring-2"
                      disabled={!isValid}>
                      Delete
                    </button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <button
                      aria-label="Close"
                      className="w-full mt-2 p-2.5 flex-1 rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2">
                      Cancel
                    </button>
                  </Dialog.Close>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
export default DeleteAccount;
