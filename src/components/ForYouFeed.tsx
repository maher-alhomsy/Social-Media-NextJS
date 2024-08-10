"use client";

import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import kyInstance from "@/lib/Ky";
import Post from "@/components/posts/Post";
import type { PostData } from "@/lib/types";

const ForYouFeed = () => {
  const { data, isPending, isError } = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: kyInstance.get("/api/posts/for-you").json<PostData[]>,
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
    <div className="space-y-5">
      {data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ForYouFeed;
