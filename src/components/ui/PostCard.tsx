"use client";
import React, { useState } from "react";

import PostInteractionSection from "./PostInteractionSection";
import ImageGallery from "./ImageGallery";
import UserCard from "./UserCard";
import DeleteAndUpdatePost from "./DeleteAndUpdatePost";

import { useUser } from "@/src/context/user.provider";
import { formatDistanceToNow } from "date-fns";
import { customizedTimeDifference } from "@/src/utils/customedTimeDifference";

// Single post card component
const PostCard = ({ post }: any) => {
  const { _id, likedUsers, dislikedUsers, comments, user: postedAuthor } = post;
  const dynamicPostInfo = {
    _id,
    likedUsers,
    dislikedUsers,
    comments,
  };
  const { user: currentUser } = useUser();

  // const postDate = new Date(post?.createdAt); // Convert the post's date to a Date object
  // const presentTime = new Date(); // Get the current time

  const timeDifference = customizedTimeDifference(post?.createdAt);

  // console.log("Posted on", post?.createdAt);
  // console.log("Current time", presentTime);
  console.log(`Time difference: ${timeDifference}`);

  // console.log("current user", currentUser);
  const currentUserId = currentUser?._id;
  const isMyPost = currentUser?._id === postedAuthor?._id;

  const [isExpanded, setIsExpanded] = useState(false);

  // Get the title and description
  const title = post.title;
  const description = post.description;

  // Handle the toggle for "See More"
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // console.log("user who has posted", post?.user?._id);

  return (
    <div className="relative p-4 bg-gradient-to-b from-default-100 to-default-50  rounded-xl shadow-lg flex flex-col gap-4">
      {/* Post header with user profile info */}
      <div className="flex justify-between gap-4">
        <div className="w-full">
          <UserCard
            authorId={post?.user?._id}
            currentUser={currentUserId}
            followers={post?.user?.followers}
            name={post?.user?.name}
            profilePhoto={post?.user?.profilePhoto}
            postedOn={timeDifference}
          />
        </div>
        <DeleteAndUpdatePost isMyPost={isMyPost} post={post} postId={_id} />
      </div>
      <div>{/* <small>{timeDifference}</small> */}</div>
      {/* Post content */}
      <div className="text-start">
        <h2 className="text-xl font-semibold">
          {title.length > 101 ? `${title.substring(0, 101)}...` : title}
        </h2>
        <div className="text-default-700">
          {isExpanded ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: description.substring(0, 70),
              }}
            />
          )}
        </div>
        {description.length > 70 && (
          <button className="text-blue-600" onClick={toggleExpand}>
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
        {/* <h2 className="text-xl font-semibold">{post.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: post.description }}
          className="text-default-700"
        /> */}
        {/* <p className="text-default-700">{post.description}</p> */}
        {post.images?.length > 0 && <ImageGallery images={post.images} />}
      </div>
      <PostInteractionSection post={dynamicPostInfo} />
    </div>
  );
};

export default PostCard;
