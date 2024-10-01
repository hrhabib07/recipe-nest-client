"use client";
import { title } from "@/src/components/primitives";
import { useUserWithId } from "@/src/hooks/auth.hook";
import { useEffect } from "react";

export default function AboutPage() {
  const { mutate, data, isLoading, error } = useUserWithId();
  // console.log(data?.data);
  const userData = data?.data;
  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error loading user data: {error.message}</p>;

  return (
    <div>
      <h1 className={title()}>Welcome to your profile {userData?.name} </h1>
    </div>
  );
}
