"use server";
import { axiosInstance } from "@/src/lib/axiosInstence";
import { revalidateTag } from "next/cache";

export const getAllPosts = async () => {
  try {
    const { data } = await axiosInstance.get("/items");

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch item data."
    );
  }
};

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};
