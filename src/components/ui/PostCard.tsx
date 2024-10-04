import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { MdThumbUp, MdThumbDown, MdComment } from "react-icons/md";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { useUpdatePost } from "@/src/hooks/post.hook";
import PostInteractionSection from "./PostInteractionSection";
// Single post card component
const PostCard = ({ post }: { post: any }) => {
  const likeCounted = post.likedUsers;
  const [likeCount, setLikeCount] = useState(post.likedUsers.length);
  const [dislikeCount, setDislikeCount] = useState(post.dislikedUsers.length);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  console.log("inside posts : ", post);
  console.log("like count:", likeCount);
  console.log("like counted:", likeCounted);
  console.log("dislike count:", dislikeCount);
  console.log("comments :", comments);
  // Mutation hook to update the post
  const updatePostMutation = useUpdatePost();

  // Create a FormData object and append data accordingly
  const handleLike = () => {
    const formData = new FormData();
    formData.append(
      "likedUsers",
      JSON.stringify([...post.likedUsers, "userId"])
    );

    const updatedPost = {
      postId: post._id,
      postData: formData, // Use the FormData object instead of a plain object
    };

    updatePostMutation.mutate(updatedPost, {
      onSuccess: () => {
        setLikeCount((prev: any) => prev + 1);
        setDislikeCount((prev: any) =>
          post.dislikedUsers.includes("userId") ? prev - 1 : prev
        );
      },
    });
  };

  // Handle dislike button click
  const handleDislike = () => {
    const formData = new FormData();
    // Convert dislikedUsers array to a JSON string before appending to FormData
    formData.append(
      "dislikedUsers",
      JSON.stringify([...post.dislikedUsers, "userId"])
    );

    const updatedPost = {
      postId: post._id,
      postData: formData, // Use the FormData object
    };

    updatePostMutation.mutate(updatedPost, {
      onSuccess: () => {
        setDislikeCount((prev: any) => prev + 1);
        setLikeCount((prev: any) =>
          post.likedUsers.includes("userId") ? prev - 1 : prev
        );
      },
    });
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (!comment.trim()) return;

    const formData = new FormData();
    // Convert comments array to a JSON string before appending to FormData
    formData.append(
      "comments",
      JSON.stringify([...comments, { text: comment }])
    );

    const updatedPost = {
      postId: post._id,
      postData: formData, // Use the FormData object
    };

    updatePostMutation.mutate(updatedPost, {
      onSuccess: () => {
        setComments((prev: any) => [...prev, { text: comment }]); // Update the comments locally
        setComment(""); // Clear the input field
      },
    });
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
      <PostInteractionSection></PostInteractionSection>
    </div>
  );
};

export default PostCard;
