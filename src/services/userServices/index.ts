"use server";
import axiosInstance from "@/src/lib/axiosInstence";
import { FieldValues } from "react-hook-form";

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

// // Update an existing post
// export const updatePost = async (
//   postId: string,
//   postData: any,
// ): Promise<any> => {
//   try {
//     // console.log("postData:", postData);
//     const { data } = await axiosInstance.put(`/items/${postId}`, postData);

//     revalidateTag("posts");

//     return data;
//   } catch (error) {
//     // console.log(error);
//     throw new Error("Failed to update post");
//   }
// };
