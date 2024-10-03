import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/itemServices";

export const getAllPostData = () => {
  return useQuery({
    queryKey: ["GET_ALL_POSTS"], // Use an object with 'queryKey' property
    queryFn: async () => {
      const data = await getAllPosts();
      return data;
    },
  });
};
