import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { EyeIcon, EyeSlashIcon, Icons } from '@/Components/Icons';
import { Button } from '@/Components/UserInterface';
import { placeholderUrl } from '@/data';
import { auth, currentUserQuery, firestore, updateUserOnlineStatus } from '@/firebase';
import { useSession } from '@/hooks';
import { cn } from '@/lib/utils';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SignUpForm: React.FC<SignUpFormProps> = ({ className, ...props }) => {
  const router = useRouter();
  const { setSessionData } = useSession();
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const [inputs, setInputs] = useState({
    email: '',
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid =
      passwordRegex.test(inputs.password) && inputs.password === inputs.confirmPassword;
    setIsFormValid(isValid);

    if (!passwordRegex.test(inputs.password)) {
      setPasswordError(
        'Password must be at least 8 characters long and include uppercase, lowercase, numeric, and special characters.',
      );
    } else if (inputs.password !== inputs.confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  }, [inputs]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (!inputs) {
    }
    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (newUser) {
        // Use the UID from Firebase Auth as the document ID in Firestore
        await setDoc(doc(firestore, 'users', newUser.user.uid), {
          uid: newUser.user.uid,
          email: newUser.user.email,
          fullName: inputs.fullName,
          userName: inputs.userName,
          jobDescription: null,
          bio: null,
          lang: null,
          following: 0,
          status: null,
          isOnline: true,
          lastSeen: { date: null, time: null },
          dateBirth: null,
          streetName: null,
          postalCode: null,
          stateprovince: null,
          country: null,
          imageUrl: placeholderUrl,
          createdAt: serverTimestamp(),
          deletedAt: null,
        });
        await updateUserOnlineStatus(newUser.user.uid, true);
        await currentUserQuery(newUser.user.uid, setSessionData);
        router.push('/user');
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleRegister}>
        <div className="grid gap-2">
          <div>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              onChange={handleChangeInput}
              type="email"
              id="email"
              name="email"
              placeholder="name@company.com"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="fullName" className="font-medium">
              Full Name
            </label>
            <input
              onChange={handleChangeInput}
              type="fullName"
              id="fullName"
              name="fullName"
              placeholder="Joe Doe"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="userName" className="font-medium">
              Profile Name
            </label>
            <input
              onChange={handleChangeInput}
              type="userName"
              id="userName"
              name="userName"
              placeholder="JoeDoeLove"
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
                onChange={handleChangeInput}
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="font-medium block leading-6 ">
              Confirm Password
            </label>
            <input
              onChange={handleChangeInput}
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>

          {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
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
      <Button type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </Button>
      <Button type="button" disabled={isLoading}>
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
export default SignUpForm;
