import React from "react";
import Image from "next/image";

import PostInteractionSection from "./PostInteractionSection";
import ImageGallery from "./ImageGallery";
import UserCard from "./UserCard";

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
    <div className="p-4 bg-gradient-to-b from-default-100 to-default-50  rounded-xl shadow-lg flex flex-col gap-4">
      {/* Post header with user profile info */}
      <div className="flex items-center gap-4">
        <UserCard
          email={post?.user?.email}
          name={post?.user?.name}
          profilePhoto={post?.user?.profilePhoto}
          userId={post?.user?._id}
          followers={post?.user?.followers}
          following={post?.user?.following}
        />
      </div>

      {/* Post content */}
      <div>
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <div
          className="text-default-700"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
        {/* <p className="text-default-700">{post.description}</p> */}
        {post.images?.length > 0 && (
          <ImageGallery images={post.images}></ImageGallery>
        )}
      </div>
      <PostInteractionSection post={dynamicPostInfo} />
    </div>
  );
};

export default PostCard;
