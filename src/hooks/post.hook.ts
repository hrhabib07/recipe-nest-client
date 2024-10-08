import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createPost,
  getAllPosts,
  getPostsWithQuery,
  getSinglePost,
  updatePost,
} from "../services/itemServices";

export const getAllPostData = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      return await getAllPosts(pageParam, 10); // Fetch with pagination (pageParam and limit)
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.length < 10) {
        return undefined; // No more posts to load
      }
      return pages.length + 1; // Increment page number for the next query
    },
    initialPageParam: 1, // This is required to avoid the error
  });
};

// Fetch all posts
// export const getAllPostData = () => {
//   return useQuery({
//     queryKey: ["posts"], // Use an object with 'queryKey' property
//     queryFn: async () => {
//       const data = await getAllPosts();

//       return data;
//     },
//   });
// };

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
export const useGetPostDataWithQuery = (query: string) => {
  return useQuery({
    queryKey: ["posts", query], // Include postId in the queryKey
    queryFn: async () => {
      const data = await getPostsWithQuery(query); // Call the correct function to fetch post data

      return data;
    },
  });
};
