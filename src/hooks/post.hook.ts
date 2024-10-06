import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../services/itemServices";
import { toast } from "sonner";

// Fetch all posts
export const getAllPostData = () => {
  return useQuery({
    queryKey: ["posts"], // Use an object with 'queryKey' property
    queryFn: async () => {
      const data = await getAllPosts();
      return data;
    },
  });
};

// Create post mutation hook
export const useCreatePost = () => {
  const queryClient = useQueryClient(); // Initialize the query client to use for invalidation

  return useMutation<any, Error, FormData>({
    mutationKey: ["posts"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // Invalidate and refetch "posts" query to get updated data
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Update post mutation hook with postId
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { postId: string; postData: any }>({
    mutationKey: ["posts"],
    mutationFn: async ({ postId, postData }) =>
      await updatePost(postId, postData),
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // Invalidate and refetch "posts" query to get updated data
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSinglePostData = (postId: string) => {
  return useQuery({
    queryKey: ["posts", postId], // Include postId in the queryKey
    queryFn: async () => {
      const data = await getSinglePost(postId); // Call the correct function to fetch post data
      return data;
    },
  });
};

// export const getSinglePostData = (postId: string) => {
//   return useQuery({
//     queryKey: ["posts", postId], // Use an object with 'queryKey' property
//     queryFn: async () => {
//       const data = await getSinglePostData(postId);
//       return data;
//     },
//   });
// };
