import React from 'react';

import { SpinnerIcon } from '../Icons';

const Spinner: React.FC = () => (
  <div className=" animate-bounce flex flex-col justify-center items-center h-screen w-screen">
    <SpinnerIcon className="w-10 h-10 animate-spin text-3xl" />
    <span className="flex justify-center items-center text-3xl">
      We&apos;re sorry it&apos;s taking longer than expected.
    </span>
  </div>
);

export default Spinner;
