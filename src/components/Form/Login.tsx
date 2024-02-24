import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { auth, currentUserQuery, populateFriends } from '@/firebase';
import { useSession } from '@/hooks';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { toast } from 'sonner';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setSessionData } = useSession();

  const handleForgot = () => {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      setIsLoading(false);
      return toast.warning('Please fill all fields');
    }
    try {
      const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (newUser) {
        await currentUserQuery(newUser.user.uid, setSessionData);
        await populateFriends(newUser.user.uid, setSessionData);
        router.push('/conversations');
      }
    } catch (error) {
      toast.error('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          id="email"
          name="email"
          placeholder="name@company.com"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="password" className="font-medium block leading-6 ">
          Password
        </label>
        <div className="relative flex items-center">
          <input
            onChange={handleInputChange}
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            {showPassword ? (
              <FaRegEyeSlash className="h-5 w-5 " onClick={togglePasswordVisibility} />
            ) : (
              <FaRegEye className="h-5 w-5 " onClick={togglePasswordVisibility} />
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-x-3">
          <input type="checkbox" id="remember-me-checkbox" className="checkbox-item peer hidden" />
          <label
            htmlFor="remember-me-checkbox"
            className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"></label>
          <span>Remember me</span>
        </div>
        <a
          href="#"
          className="text-center text-indigo-600 hover:text-indigo-500"
          onClick={handleForgot}>
          Forgot password?
        </a>
      </div>
      <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
        {isLoading ? 'Loging in ...' : 'Log in'}
      </button>
    </form>
  );
};
export default LoginForm;
