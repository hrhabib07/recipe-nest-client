import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IPost {
  _id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  city: string;
  dateFound: string;
  status: string;
  isReported: boolean;
  reportCount: number;
  category: ICategory;
  user: IUser;
  questions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategory {
  _id: string;
  name: string;
  postCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUser {
  _id?: string;
  name: string;
  role: string;
  email: string;
  password: string;
  status: string;
  passwordChangedAt?: Date;
  mobileNumber?: string;
  profilePhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  bio?: string;
  followers?: string[] | [];
  following?: string[] | [];
  posts?: string[] | [];
  dislikedPosts?: string[] | [];
  likedPosts?: string[] | [];
  subscription?: {
    _id: string;
    createdAt: Date;
    validUntil: string;
  } | null;
}
