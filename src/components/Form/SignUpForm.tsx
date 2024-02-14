import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import Button from '../Button/Button';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSession } from '@/hooks/useSession';
import { currentUserQuery, populateFriends } from '@/firebase/query';

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
    <form className="space-y-6" onSubmit={handleRegister}>
      <h3 className="text-xl font-medium text-white">Sign Up</h3>
      <div>
        <label htmlFor="email" className="text-sm font-medium block leading-6 text-gray-900">
          Email
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
				 placeholder:text-gray-400 text-black"
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label htmlFor="fullName" className="text-sm font-medium block leading-6 text-gray-900">
          Full Name
        </label>
        <input
          onChange={handleChangeInput}
          type="fullName"
          name="fullName"
          id="fullName"
          className="border-2 outline-none sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
				 placeholder:text-gray-400 text-black"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="userName" className="text-sm font-medium block leading-6 text-gray-900">
          Profile Name
        </label>
        <input
          onChange={handleChangeInput}
          type="userName"
          name="userName"
          id="userName"
          className="border-2 outline-none sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
				 placeholder:text-gray-400 text-black"
          placeholder="johnDoeLove"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium block leading-6 text-gray-900">
          Password
        </label>
        <div className="relative flex items-center">
          <input
            onChange={handleChangeInput}
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            className="border-2 outline-none sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
				 placeholder:text-gray-400 text-black "
            placeholder="*******"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            {showPassword ? (
              <FaRegEyeSlash className="h-5 w-5 text-black" onClick={togglePasswordVisibility} />
            ) : (
              <FaRegEye className="h-5 w-5 text-black" onClick={togglePasswordVisibility} />
            )}
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium block leading-6 text-gray-900">
          Confirm password
        </label>
        <input
          onChange={handleChangeInput}
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          id="confirmPassword"
          className="border-2 outline-none sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
				 placeholder:text-gray-400 text-black "
          placeholder="*******"
        />
      </div>
      {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}

      <Button type="submit" disabled={!isFormValid} fullWidth>
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </Button>
    </form>
  );
};
export default SignUpForm;
