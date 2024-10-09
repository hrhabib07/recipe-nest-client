import React, { useState } from "react";

import PostInteractionSection from "./PostInteractionSection";
import ImageGallery from "./ImageGallery";
import UserCard from "./UserCard";
import { useUser } from "@/src/context/user.provider";
import { button } from "@nextui-org/theme";

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
  console.log("currentUser : ", currentUser);
  const isMyPost = currentUser?._id === postedAuthor?._id;

  // State to toggle the visibility of the dropdown menu
  const [showMenu, setShowMenu] = useState(false);

  // Toggle dropdown menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative p-4 bg-gradient-to-b from-default-100 to-default-50  rounded-xl shadow-lg flex flex-col gap-4">
      {/* Post header with user profile info */}
      <div className="flex justify-between gap-4">
        <div className="w-full">
          <UserCard
            email={post?.user?.email}
            followers={post?.user?.followers}
            following={post?.user?.following}
            name={post?.user?.name}
            profilePhoto={post?.user?.profilePhoto}
            userId={post?.user?._id}
          />
        </div>
        {isMyPost && (
          <div className="text-default-700 hover:text-blue-500 cursor-pointer">
            <button className="relative" onClick={() => setShowMenu(!showMenu)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            {showMenu && (
              <div className="absolute right-6 mt-2 w-40 bg-gradient-to-b from-default-100 to-default-50 rounded-md shadow-lg z-10 ">
                <ul className="py-1">
                  {/* Update Post option */}
                  <li
                    className="px-4 py-2 text-default-700 hover:bg-default-400 cursor-pointer"
                    onClick={() => {
                      // Placeholder for opening the update post modal
                      console.log("Update Post clicked");
                    }}
                  >
                    Update Post
                  </li>
                  {/* Delete Post option */}
                  <li
                    className="px-4 py-2 text-default-700 hover:bg-default-400 cursor-pointer"
                    onClick={() => {
                      // Placeholder for deleting the post
                      console.log("Delete Post clicked");
                    }}
                  >
                    Delete Post
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
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
