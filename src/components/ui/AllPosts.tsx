import React from "react";
import PostCard from "./PostCard";
import { getAllPostData } from "@/src/hooks/post.hook";

const AllPosts = () => {
  const { data: postsData, isLoading: isPostsDataLoading } = getAllPostData();
  const posts = postsData?.data;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts?.map((post: any) => <PostCard key={post._id} post={post} />)}
    </div>
  );
};

export default AllPosts;
