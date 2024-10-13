"use client";

import { useState } from "react";

import UserCard from "./UserCard";
import DeleteAndUpdatePost from "./DeleteAndUpdatePost";
import ImageGallery from "./ImageGallery";
import PostDetailsInteraction from "./PostDetailsInteraction";

import { customizedTimeDifference } from "@/src/utils/customedTimeDifference";
import { useUser } from "@/src/context/user.provider";

const PostDetailCard = ({ post }: any) => {
  const { _id, likedUsers, dislikedUsers, comments, user: postedAuthor } = post;
  const dynamicPostInfo = {
    _id,
    likedUsers,
    dislikedUsers,
    comments,
  };
  const { user: currentUser } = useUser();
  const timeDifference = customizedTimeDifference(post?.createdAt);

  const currentUserId = currentUser?._id;
  const isMyPost = currentUser?._id === postedAuthor?._id;

  const [isExpanded, setIsExpanded] = useState(false);

  // Get the title and description
  const title = post.title;
  const description = post.description;

  console.log(description);

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
            postedOn={timeDifference}
            profilePhoto={post?.user?.profilePhoto}
          />
        </div>
        <DeleteAndUpdatePost isMyPost={isMyPost} post={post} postId={_id} />
      </div>
      <div>{/* <small>{timeDifference}</small> */}</div>
      {/* Post content */}
      <div className="text-start">
        <h2 className="text-xl font-semibold">{title}</h2>
        {/* Description content with enhanced styles */}
        {/* Rich text content */}
        <div className="text-default-900">
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="prose text-default-900"
          />
        </div>

        {post.images?.length > 0 && <ImageGallery images={post.images} />}
      </div>
      <div className="w-full mx-auto flex justify-center">
        <PostDetailsInteraction post={dynamicPostInfo} />
      </div>
    </div>
  );
};

export default PostDetailCard;
