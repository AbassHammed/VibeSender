import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { auth, currentUserQuery, firestore, populateFriends } from '@/firebase';
import { useSession } from '@/hooks';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'sonner';

import { EyeIcon, EyeSlashIcon } from '../Icons';

const SignUpForm: React.FC = () => {
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
      return toast.info('Please fill all fields');
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
          lastSeen: null,
          dateBirth: null,
          streetName: null,
          postalCode: null,
          stateprovince: null,
          country: null,
          imageUrl: null,
          createdAt: serverTimestamp(),
          deletedAt: null,
        });
        await currentUserQuery(newUser.user.uid, setSessionData);
        await populateFriends(newUser.user.uid, setSessionData);
        router.push('/user');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-5">
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
      <button
        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        disabled={!isFormValid}>
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
};
export default SignUpForm;
