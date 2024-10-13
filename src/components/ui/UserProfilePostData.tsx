import React from "react";

import PostCard from "./PostCard";
import SkeletonPostCard from "./SkeletonPostCard";

import { useGetPostDataWithQuery } from "@/src/hooks/post.hook";

const UserProfilePostData = ({ userId }: { userId: string }) => {
  //   const { data: postsData, isLoading: isPostsDataLoading } = getAllPostData();
  const {
    data: postsData,
    isLoading: isPostsDataLoading,
    isError,
  } = useGetPostDataWithQuery(`user=${userId}`);

  //   const posts = postsData?.data;
  const skeletonArray = Array.from({ length: 9 }, (_, index) => index);

  if (isPostsDataLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {skeletonArray.map((item) => (
          <SkeletonPostCard key={item} />
        ))}
      </div>
    );
  }
  const posts = postsData?.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts?.map((post: any) => <PostCard key={post._id} post={post} />)}
    </div>
  );
};

export default UserProfilePostData;
