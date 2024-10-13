"use client";
import React, { useState } from "react"; // Import useRouter for navigation
import { useRouter } from "next/navigation";

import PostInteractionSection from "./PostInteractionSection";
import ImageGallery from "./ImageGallery";
import UserCard from "./UserCard";
import DeleteAndUpdatePost from "./DeleteAndUpdatePost";

import { useUser } from "@/src/context/user.provider";
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
  const timeDifference = customizedTimeDifference(post?.createdAt);

  const currentUserId = currentUser?._id;
  const isMyPost = currentUser?._id === postedAuthor?._id;
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // Get the title and description
  const title = post.title;
  const description = post.description;

  // Handle redirection to the post details page
  const goToPostDetails = () => {
    router.push(`/posts/${_id}`); // Assuming your post details route follows /post/[id]
  };

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

      <div className="text-start">
        <h2 className="text-xl font-semibold">
          {title.length > 101 ? `${title.substring(0, 101)}...` : title}
        </h2>

        <div className="text-default-700">
          {/* Minimum height to ensure consistency */}
          {isExpanded ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            <>
              <div
                dangerouslySetInnerHTML={{
                  __html: description.substring(0, 70),
                }}
              />
            </>
          )}
        </div>

        {description.length > 70 ? (
          <button className="text-blue-600" onClick={goToPostDetails}>
            {isExpanded ? "See Less" : "See More"}
          </button>
        ) : (
          <>
            <br />
          </>
        )}

        {post.images?.length > 0 && <ImageGallery images={post.images} />}
      </div>

      <PostInteractionSection post={dynamicPostInfo} />
    </div>
  );
};

export default PostCard;
