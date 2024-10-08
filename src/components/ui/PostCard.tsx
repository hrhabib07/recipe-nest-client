import React from "react";
import Image from "next/image";

import PostInteractionSection from "./PostInteractionSection";
import ImageGallery from "./ImageGallery";

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
            alt={post.user.name}
            className="rounded-full"
            height={50}
            src={post.user.profilePhoto}
            width={50}
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
          <ImageGallery images={post.images} title={post.title}></ImageGallery>
          // <div className="my-4">
          //   <Image
          //     alt={post.title}
          //     className="rounded-lg object-cover"
          //     height={300}
          //     src={post.images[0]}
          //     width={500}
          //   />
          // </div>
        )}
      </div>
      <PostInteractionSection post={dynamicPostInfo} />
    </div>
  );
};

export default PostCard;
