import React from "react";
import Image from "next/image";
import PostInteractionSection from "./PostInteractionSection";

// Single post card component
const PostCard = ({ post }: any) => {
  const { _id, likedUsers, dislikedUsers, comments } = post;
  const dynamicPostInfo = {
    _id,
    likedUsers,
    dislikedUsers,
    comments,
  };
  return (
    <div className="p-4 bg-gradient-to-b from-default-100 rounded-xl shadow-lg flex flex-col gap-4">
      {/* Post header with user profile info */}
      <div className="flex items-center gap-4">
        {post.user?.profilePhoto ? (
          <Image
            src={post.user.profilePhoto}
            alt={post.user.name}
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-default-200" />
        )}
        <div>
          <h3 className="text-lg font-semibold">
            {post.user?.name || "Unknown User"}
          </h3>
          <p className="text-sm text-default-500">{post.user?.email}</p>
        </div>
      </div>

      {/* Post content */}
      <div>
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-default-700">{post.description}</p>
        {post.images?.length > 0 && (
          <div className="my-4">
            <Image
              src={post.images[0]}
              alt={post.title}
              width={500}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </div>
      <PostInteractionSection post={dynamicPostInfo}></PostInteractionSection>
    </div>
  );
};

export default PostCard;
