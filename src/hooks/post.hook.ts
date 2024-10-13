import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsForAdmin,
  getPostsWithQuery,
  getSinglePost,
  updatePost,
} from "../services/itemServices";

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

export const useAllPostDataForAdmin = (
  searchTerm = "",
  contentType = "Free"
) => {
  return useQuery({
    queryKey: ["posts", searchTerm, contentType], // Add searchTerm and contentType for proper caching
    queryFn: () => getAllPostsForAdmin(searchTerm, contentType),
  });
};

export const useAllPostData = (searchTerm: string, contentType: string) => {
  return useInfiniteQuery({
    queryKey: ["posts", searchTerm, contentType], // Add searchTerm and contentType to the query key for caching
    queryFn: async ({ pageParam = 1 }) => {
      return await getAllPosts(
        pageParam,
        10,
        "-likedUsers",
        searchTerm,
        contentType
      ); // Fetch with pagination and additional parameters
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
// delete post mutation hook with postId
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["posts"],
    mutationFn: async (postId) => await deletePost(postId),
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
