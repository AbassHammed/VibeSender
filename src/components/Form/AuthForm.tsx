import React, { useCallback, useState } from 'react';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

type page = 'LOGIN' | 'REGISTER';

const AuthForm: React.FC = () => {
  const [page, setPage] = useState<page>('LOGIN');

  const togglePage = useCallback(() => {
    page === 'LOGIN' ? setPage('REGISTER') : setPage('LOGIN');
  }, [page]);
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 pb-4 shadow sm:rounded-lg sm:px-10">
        {page === 'LOGIN' ? <LoginForm /> : <SignUpForm />}
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>{page === 'LOGIN' ? 'New to VibeSender ?' : 'Already have an account'}</div>
          <div onClick={togglePage} className="underline cursor-pointer">
            {page === 'LOGIN' ? 'Create an account' : 'Log in'}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
