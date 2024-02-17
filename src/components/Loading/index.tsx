import React from 'react';

import { Spinner } from '@nextui-org/react';

const Loading: React.FC = () => (
  <div className="flex justify-center items-center h-screen w-screen">
    <Spinner size="lg" color="primary" label="We are sorry it is taking time." />
  </div>
);

export default Loading;
