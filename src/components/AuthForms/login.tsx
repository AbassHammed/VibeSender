import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { EyeIcon, EyeSlashIcon, Icons } from '@/Components/Icons';
import { Button } from '@/Components/UserInterface';
import { auth, currentUserQuery } from '@/firebase';
import { useSession } from '@/hooks';
import { cn } from '@/lib/utils';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginForm: React.FC<LoginFormProps> = ({ className, ...props }) => {
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
    }
    try {
      const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (newUser) {
        await currentUserQuery(newUser.user.uid, setSessionData);
        router.push('/messages');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleLogin}>
        <div className="grid gap-2">
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
              <a
                className="text-gray-400 absolute right-3 inset-y-0 mt-4 active:text-gray-600"
                onClick={togglePasswordVisibility}>
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </a>
              <input
                onChange={handleInputChange}
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Log In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </Button>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        GitHub
      </Button>
    </div>
  );
};
export default LoginForm;
