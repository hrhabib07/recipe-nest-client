import React, { useState } from "react";
import { Button } from "@nextui-org/button";

import UpdatePostModal from "./UpdatePostModal";

import { useDeletePost } from "@/src/hooks/post.hook";

const DeleteAndUpdatePost = ({ isMyPost, postId, post }: any) => {
  const { mutate: deletePost } = useDeletePost();
  // State to toggle the visibility of the dropdown menu
  const [showMenu, setShowMenu] = useState(false);
  // Toggle dropdown menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleDeletePost = () => {
    deletePost(postId);
  };

  return (
    <>
      {isMyPost && (
        <div className="text-default-700 hover:text-blue-500 cursor-pointer">
          <button className="relative" onClick={toggleMenu}>
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                  //   onClick={() => {
                  //     // Placeholder for opening the update post modal
                  //     console.log("Update Post clicked");
                  //   }}
                >
                  <UpdatePostModal post={post} />
                </li>
                {/* Delete Post option */}
                <li
                  className="px-4 py-2 text-default-700 hover:bg-default-400 cursor-pointer"
                  //   onClick={() => {
                  //     // Placeholder for opening the update post modal
                  //     console.log("Update Post clicked");
                  //   }}
                >
                  <Button className="bg-transparent" onClick={handleDeletePost}>
                    Delete Post
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DeleteAndUpdatePost;
