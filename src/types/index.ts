import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type color = 'default' | 'success' | 'danger' | 'warning';

export type User = {
  uid: string;
  email: string;
  fullName: string;
  userName: string;
  jobDescription: string;
  bio: string;
  status: color;
  following: number;
  lastSeen: string;
  dateBirth: string;
  streetName: string;
  postalCode: string;
  stateprovince: string;
  country: string;
  imageUrl: string;
  createdAt: string;
  deletedAt: string;
};

/*Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons: 1. You might have mismatching versions of React and the renderer (such as React DOM) 2. You might be breaking the Rules of Hooks 3. You might have more than one copy of React in the same app See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.*/
