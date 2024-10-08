import React from "react";

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
          followers={post?.user?.followers}
          following={post?.user?.following}
          name={post?.user?.name}
          profilePhoto={post?.user?.profilePhoto}
          userId={post?.user?._id}
        />
      </div>

      {/* Post content */}
      <div className="text-start">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: post.description }}
          className="text-default-700"
        />
        {/* <p className="text-default-700">{post.description}</p> */}
        {post.images?.length > 0 && <ImageGallery images={post.images} />}
      </div>
      <PostInteractionSection post={dynamicPostInfo} />
    </div>
  );
};

export default PostCard;
