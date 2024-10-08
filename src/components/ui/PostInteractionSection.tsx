import React, { useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import Link from "next/link";

import { useUser } from "@/src/context/user.provider";
import { useUpdatePost } from "@/src/hooks/post.hook";

type TProps = {
  _id: string;
  likedUsers: string[];
  dislikedUsers: string[];
  comments: {
    users: { name: string; email: string; profilePhoto: string; _id: string };
    comment: string;
    _id: string;
  }[];
};

const PostInteractionSection = ({ post }: { post: TProps }) => {
  const { user } = useUser();
  const userId = user?._id;
  const {
    mutate: handleUpdatePost,
    isPending: updatePostPending,
    isSuccess: updatePostSuccess,
  } = useUpdatePost();
  const { _id: postId, likedUsers, dislikedUsers, comments } = post;

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comment, setComment] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Handle like button click
  const handleLikeClick = () => {
    if (!userId) {
      onOpen(); // Show modal if user is not logged in

      return;
    }
    if (disliked) {
      setDisliked(false); // Reset dislike if like is selected
    }
    setLiked(!liked);
    const payload: { postId: string; postData: any } = {
      postId,
      postData: { likedUsers: [userId] },
    };

    handleUpdatePost(payload);
  };

  // Handle dislike button click
  const handleDislikeClick = () => {
    if (!userId) {
      onOpen(); // Show modal if user is not logged in

      return;
    }
    if (liked) {
      setLiked(false); // Reset like if dislike is selected
    }
    setDisliked(!disliked);
    const payload: { postId: string; postData: any } = {
      postId,
      postData: { dislikedUsers: [userId] },
    };

    handleUpdatePost(payload);
  };

  // Handle comment box click
  const handleCommentClick = () => {
    setCommentsVisible(!commentsVisible);
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    const updatedPost = {
      postId: post._id,
      postData: { comments: [{ users: userId, comment }] }, // Use the FormData object
    };

    handleUpdatePost(updatedPost);
  };

  // Determine initial like and dislike states based on post data
  useEffect(() => {
    if (likedUsers.includes(userId as string)) {
      setLiked(true);
    }
    if (dislikedUsers.includes(userId as string)) {
      setDisliked(true);
    }
  }, [likedUsers, disliked, userId, liked, disliked]);

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg  ">
      {/* Action buttons with like and dislike counts */}
      <div className="flex gap-6 items-center">
        {/* Like button */}
        <Button
          className={`bg-default-100 transition-transform duration-300 ${
            liked ? "text-primary-500 scale-110" : "text-default-500"
          }`}
          startContent={<MdThumbUp className="size-4" />}
          onClick={handleLikeClick}
        >
          ({likedUsers.length})
        </Button>

        {/* Dislike button */}
        <Button
          className={`bg-default-100 transition-transform duration-300 ${
            disliked ? "text-danger-500 scale-110" : "text-default-500"
          }`}
          startContent={<MdThumbDown className="size-4" />}
          onClick={handleDislikeClick}
        >
          ({dislikedUsers.length})
        </Button>

        {/* Comment button */}
        <Button
          className={`bg-default-100 transition-transform duration-300 ${
            commentsVisible ? "text-primary-500 scale-110" : "text-default-500"
          }`}
          startContent={<AiOutlineComment className="size-4" />}
          onClick={handleCommentClick}
        >
          ({comments.length})
        </Button>
      </div>

      {/* Comments Section */}
      {commentsVisible && (
        <div className="mt-6">
          {/* Comment Input Box */}
          <div className="flex items-center gap-4 p-4 rounded-lg shadow-lg">
            <Input
              className="flex-1 mb-0 shadow-sm rounded-md focus:ring-2 focus:ring-default-200 transition-all"
              label="Write a comment"
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              className="bg-gradient-to-l from-default-100  hover:from-default-200  text-white font-semibold px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
              onPress={handleCommentSubmit}
            >
              Comment
            </Button>
          </div>
          {/* Comments Container */}
          <div className="p-2  rounded-lg shadow-sm">
            {comments.length > 0 ? (
              comments?.map((comment, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 mb-4 bg-default-100  rounded-lg shadow-sm"
                >
                  {/* User Avatar */}
                  {comment?.users?.profilePhoto ? (
                    <>
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 hover:opacity-70">
                        <Link href={`/people/${userId}`}>
                          <img
                            alt={comment?.users?.name}
                            className="w-full h-full rounded-full object-cover border-2 border-primary-500"
                            src={comment?.users?.profilePhoto}
                          />
                        </Link>
                      </div>
                      {/* <Image
                        alt={comment?.users?.name}
                        className="rounded-full "
                        height={50}
                        src={comment?.users?.profilePhoto}
                        width={50}
                      /> */}
                    </>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-default-100 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-500">
                        U
                      </span>
                    </div>
                  )}
                  {/* Comment Content */}
                  <div className="flex-1">
                    {/* User Information */}
                    <div className="flex items-center justify-between">
                      <Link href={`/people/${comment?.users?._id}`}>
                        <h3 className="text-base font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-blue-500 hover:underline  ">
                          {comment?.users?.name || "Unknown User"}
                        </h3>
                      </Link>
                    </div>
                    {/* Comment Text */}
                    <p className="text-left mb-2">{comment?.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center italic text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Alert Modal */}
      <>
        {/* <Button onPress={onOpen}>Open Modal</Button> */}
        <Modal
          className="bg-gradient-to-b from-default-100 shadow-lg"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  You need to be logged in!
                </ModalHeader>
                <ModalBody>
                  <p>
                    Please log in to interact with the post. Would you like to
                    be redirected to the login page?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Link href="/login">
                    <Button color="primary" onPress={onClose}>
                      Login
                    </Button>
                  </Link>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default PostInteractionSection;
