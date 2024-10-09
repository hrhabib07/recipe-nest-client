import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import PostCard from "./PostCard";
import SkeletonPostCard from "./SkeletonPostCard";

import { useAllPostData } from "@/src/hooks/post.hook";

const AllPosts = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAllPostData();

  const posts = data?.pages.flatMap((page: { data: any }) => page.data) || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Array.from({ length: 9 }, (_, index) => (
          <SkeletonPostCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more posts to display!</b>
          </p>
        }
        hasMore={!!hasNextPage}
        loader={<h4>Loading more posts...</h4>}
        next={fetchNextPage}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {posts.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </InfiniteScroll>

      {isFetchingNextPage && <h4>Loading more...</h4>}
    </div>
  );
};

export default AllPosts;
