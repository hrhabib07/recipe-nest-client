"use server";
import { revalidateTag } from "next/cache";

import { axiosInstance } from "@/src/lib/axiosInstence";

// Create a new post
export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("posts"); // Optional: Server-side cache revalidation if applicable

    return data;
  } catch (error) {
    // console.log(error);
    throw new Error("Failed to create post");
  }
};

// Fetch all posts without pagination for admin
export const getAllPostsForAdmin = async (
  searchTerm = "",
  contentType = "Free"
) => {
  try {
    const { data } = await axiosInstance.get("/items", {
      params: { sortBy: "-likedUsers", searchTerm, contentType }, // Add your required params
    });

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch item data."
    );
  }
};

// Fetch all posts from the server
export const getAllPosts = async (
  page: number = 1,
  limit: number = 10,
  sortBy: string = "-likedUsers",
  searchTerm: string = "",
  contentType: string = "Free" // Default value
) => {
  try {
    const { data } = await axiosInstance.get("/items", {
      params: { page, limit, sortBy, searchTerm, contentType }, // Include searchTerm and contentType
      // params: { page, limit, sortBy, searchTerm }, // Include searchTerm and contentType
    });

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch item data."
    );
  }
};

// get posts withUserId
export const getPostsWithQuery = async (query: string) => {
  try {
    const { data } = await axiosInstance.get(`/items?${query}`);

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch item data."
    );
  }
};

export const getSinglePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/items/${postId}`);

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch item data."
    );
  }
};

// Update an existing post
export const updatePost = async (
  postId: string,
  postData: any
): Promise<any> => {
  try {
    // console.log("postData:", postData);
    const { data } = await axiosInstance.put(`/items/${postId}`, postData);

    revalidateTag("posts");

    return data;
  } catch (error) {
    // console.log(error);
    throw new Error("Failed to update post");
  }
};
export const deletePost = async (postId: string): Promise<any> => {
  try {
    // console.log("postData:", postData);
    const { data } = await axiosInstance.delete(`/items/${postId}`);

    revalidateTag("posts");

    return data;
  } catch (error) {
    // console.log(error);
    throw new Error("Failed to delete post");
  }
};
