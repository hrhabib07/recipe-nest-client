"use client";
import { usePathname } from "next/navigation";
import React from "react";

import PostDetailCard from "@/src/components/ui/PostDetailsCard";
import { useSinglePostData } from "@/src/hooks/post.hook";

const Page = () => {
  const pathName = usePathname();
  const postId = pathName.split("/").pop();
  const { data } = useSinglePostData(postId as string);
  const post = data?.data;

  // console.log(post);

  return <div>{post && <PostDetailCard post={post} />}</div>;
};

export default Page;
