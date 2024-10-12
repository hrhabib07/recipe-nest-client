"use client";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import PostCard from "./PostCard";
import SkeletonPostCard from "./SkeletonPostCard";

import { useAllPostData } from "@/src/hooks/post.hook";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

const AllPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contentType, setContentType] = useState("Free"); // Default value
   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAllPostData(searchTerm, contentType);

  console.log(contentType, searchTerm);

  const posts = data?.pages.flatMap((page: { data: any }) => page.data) || [];

  

  return (
    <>
      <>
        <div className="flex justify-end items-end me-8 gap-4">
          {/* Search Bar */}
          <div className="my-8 w-96  justify-end">
            <Input
              endContent={
                <span className="text-default-400">
                  <svg
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              }
              label="Search"
              style={{ width: "100%" }} // Set width to 100% or a fixed value
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="my-8 w-48 justify-end">
            <Select
              label="Content Type"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              style={{ width: "100%" }} // Set width to 100% or a fixed value
            >
              <SelectItem key="Free" value="Free">
                Free
              </SelectItem>
              <SelectItem key="Premium" value="Premium">
                Premium
              </SelectItem>
            </Select>
          </div>
        </div>
      </>
      <>
      {
        isLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Array.from({ length: 9 }, (_, index) => (
          <SkeletonPostCard key={index} />
        ))}
      </div> : <>
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
       </>
      }
      </>
    </>
  );
};

export default AllPosts;
