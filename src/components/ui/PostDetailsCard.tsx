"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";

import { useSinglePostData } from "@/src/hooks/post.hook";
const PostDetailCard = ({ postId }: { postId: string }) => {
  const [newComment, setNewComment] = useState("");
  const { data: post, isLoading } = useSinglePostData(postId as string);

  //   if (id) {
  //     // Fetch post details by postId (you can replace this with your API call)
  //     fetch(`/api/items/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => setPost(data));
  //   }
  // }, [id]);

  // Submit a new comment
  // const handleCommentSubmit = () => {
  //   if (newComment.trim()) {
  //     const updatedComments = [
  //       ...post.comments,
  //       {
  //         users: {
  //           name: "Current User",
  //           email: "user@example.com",
  //           profilePhoto: "",
  //         },
  //         comment: newComment,
  //       },
  //     ];

  //     // Call the API to update comments (replace with your own implementation)
  //     fetch(`/api/posts/${id}`, {
  //       method: "POST",
  //       body: JSON.stringify({ comments: updatedComments }),
  //     }).then(() => {
  //       setPost((prevPost: any) => ({
  //         ...prevPost,
  //         comments: updatedComments,
  //       }));
  //       setNewComment(""); // Clear input
  //     });
  //   }
  // };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-default-100 rounded-lg shadow-lg">
      {/* Post header */}
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
          <Image
            alt={post.title}
            className="rounded-lg object-cover my-4"
            height={300}
            src={post.images[0]}
            width={500}
          />
        )}
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">
          Comments ({post.comments.length})
        </h3>
        <div className="p-4 rounded-lg shadow-lg bg-default-200">
          {post.comments.length > 0 ? (
            post.comments.map((comment: any, index: number) => (
              <div
                key={index}
                className="flex gap-4 p-4 mb-4 bg-white rounded-lg shadow-sm"
              >
                <Image
                  alt={comment.users?.name || "User"}
                  className="rounded-full"
                  height={40}
                  src={comment.users?.profilePhoto || "/default-avatar.png"}
                  width={40}
                />
                <div>
                  <h4 className="font-semibold">
                    {comment.users?.name || "Unknown User"}
                  </h4>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>

        {/* New comment input */}
        <div className="mt-4">
          <Input
            label="Add a comment"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button className="mt-2">Submit Comment</Button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailCard;
