"use client";

import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Post from "@/components/posts/Post";
import type { PostData } from "@/lib/types";

const ForYouFeed = () => {
  const { data, isPending, isError } = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: async () => {
      const res = await fetch("/api/posts/for-you");
      if (!res.ok) {
        throw Error(`Request failed with status code ${res.status}`);
      }

      return res.json();
    },
  });

  if (isPending) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (isError) {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <>
      {data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default ForYouFeed;
