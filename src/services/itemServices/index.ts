import { axiosInstance } from "@/src/lib/axiosInstence";

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
