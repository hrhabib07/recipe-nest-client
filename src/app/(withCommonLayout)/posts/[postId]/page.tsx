"use client";
import PostCard from "@/src/components/ui/PostCard";
import PostDetailCard from "@/src/components/ui/PostDetailsCard";
import { useSinglePostData } from "@/src/hooks/post.hook";
import { usePathname } from "next/navigation";
import React from "react";

const page = () => {
  const pathName = usePathname();
  const postId = pathName.split("/").pop();
  const { data } = useSinglePostData(postId as string);
  const post = data?.data;
  console.log(post);

  return <div>{post && <PostDetailCard post={post}></PostDetailCard>}</div>;
};

export default page;
