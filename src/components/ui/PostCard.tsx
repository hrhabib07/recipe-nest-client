import React from "react";
import { Button } from "@nextui-org/button";
import { MdThumbUp, MdThumbDown, MdComment } from "react-icons/md";
import Image from "next/image";

// Single post card component
const PostCard = ({ post }: { post: any }) => {
  return (
    <div className="p-4 bg-default rounded-xl shadow-lg flex flex-col gap-4">
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

      {/* Action buttons */}
      <div className="flex gap-4 items-center">
        <Button
          variant="light"
          color="primary"
          startContent={<MdThumbUp />}
          className="w-full"
        >
          Upvote
        </Button>
        <Button
          variant="light"
          color="danger"
          startContent={<MdThumbDown />}
          className="w-full"
        >
          Downvote
        </Button>
      </div>

      {/* Comments section */}
      <div>
        <h4 className="font-semibold">Comments</h4>
        {post.comments.length > 0 ? (
          <div className="mt-2 space-y-2">
            {post.comments.map((comment: any, index: number) => (
              <div
                key={index}
                className="border p-2 rounded-lg bg-default-100 text-default-800"
              >
                {comment.text}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-default-500 mt-2">No comments yet</p>
        )}
        {/* Comment input box */}
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Add a comment..."
            className="border rounded-lg p-2 w-full text-default-700"
          />
          <Button color="primary" variant="solid" startContent={<MdComment />}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
