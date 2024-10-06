"use server";
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
