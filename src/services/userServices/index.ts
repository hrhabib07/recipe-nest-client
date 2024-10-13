"use server";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/axiosInstence";

export const getAllUsers = async (query?: string) => {
  try {
    if (query) {
      const { data } = await axiosInstance.get(
        `/users?role=USER&searchTerm=${query}`
      );

      return data;
    } else {
      const { data } = await axiosInstance.get(`/users?role=USER`);

      return data;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data."
    );
  }
};
export const getAllAdmins = async (query?: string) => {
  try {
    if (query) {
      const { data } = await axiosInstance.get(
        `/users?role=ADMIN&searchTerm=${query}`
      );

      return data;
    } else {
      const { data } = await axiosInstance.get(`/users?role=ADMIN`);

      return data;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data."
    );
  }
};
export const getSingleUsersProfileData = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/${userId}`);

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data."
    );
  }
};

export const updateUserInfo = async (userId: string, userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(`/users/${userId}`, userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const unfollowUser = async (userId: string, userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(
      `/users/unfollow/${userId}`,
      userData
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
