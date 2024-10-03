import { useMutation, useQuery } from "@tanstack/react-query";
import { createPost, getAllPosts } from "../services/itemServices";
import { toast } from "sonner";

export const getAllPostData = () => {
  return useQuery({
    queryKey: ["GET_ALL_POSTS"], // Use an object with 'queryKey' property
    queryFn: async () => {
      const data = await getAllPosts();
      return data;
    },
  });
};

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
