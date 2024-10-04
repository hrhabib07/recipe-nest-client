import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { AiOutlineComment } from "react-icons/ai";
import { MdThumbDown, MdThumbUp } from "react-icons/md";

const PostInteractionSection = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comment, setComment] = useState("");

  // Handle like button click
  const handleLikeClick = () => {
    if (disliked) {
      setDisliked(false); // Reset dislike if like is selected
    }
    setLiked(!liked);
  };

  // Handle dislike button click
  const handleDislikeClick = () => {
    if (liked) {
      setLiked(false); // Reset like if dislike is selected
    }
    setDisliked(!disliked);
  };

  // Handle comment box click
  const handleCommentClick = () => {
    setCommentsVisible(!commentsVisible);
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-gradient-to-r from-default-100 shadow-lg">
      {/* Action buttons with like and dislike counts */}
      <div className="flex gap-6 items-center">
        {/* Like button */}
        <Button
          startContent={<MdThumbUp className="size-4" />}
          onClick={handleLikeClick}
          className={`bg-gradient-to-l from-default-100 transition-transform duration-300 ${
            liked ? "text-primary-500 scale-110" : "text-default-500"
          }`}
        ></Button>

        {/* Dislike button */}
        <Button
          startContent={<MdThumbDown className="size-4" />}
          onClick={handleDislikeClick}
          className={`bg-gradient-to-l from-default-100 transition-transform duration-300 ${
            disliked ? "text-danger-500 scale-110" : "text-default-500"
          }`}
        ></Button>

        {/* Comment button */}
        <Button
          startContent={<AiOutlineComment className="size-4" />}
          onClick={handleCommentClick}
          className={`bg-gradient-to-l from-default-100 transition-transform duration-300 ${
            commentsVisible ? "text-primary-500 scale-110" : "text-default-500"
          }`}
        ></Button>
      </div>

      {/* Comments section */}
      {commentsVisible && (
        <div className="flex flex-col mt-4">
          <Input
            label="Write a comment"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-4"
          />
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600 italic">
              No comments yet. Be the first to comment!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInteractionSection;
