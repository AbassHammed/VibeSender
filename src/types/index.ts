import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type User = {
  uid: string;
  email: string;
  fullName: string;
  userName: string;
  jobDescription: string;
  bio: string;
  status: boolean;
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
