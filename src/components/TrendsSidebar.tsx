import { Suspense } from "react";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { unstable_cache } from "next/cache";

import prisma from "@/lib/prisma";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";
import { formatNumber } from "@/lib/utils";
import { validateRequest } from "../../auth";
import { userDataSelect } from "@/lib/types";

const TrendsSidebar = () => {
  return (
    <div className="sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none space-y-5">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
};

export default TrendsSidebar;

const WhoToFollow = async () => {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    take: 5,
    select: userDataSelect,
    where: { NOT: { id: user.id } },
  });

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Who to follow</div>

      {usersToFollow.map(({ id, avatarUrl, displayName, username }) => (
        <div key={id} className="flex items-center justify-between gap-3">
          <Link href={`/users/${username}`} className="flex items-center gap-3">
            <UserAvatar avatarUrl={avatarUrl} className="flex-none" />

            <div>
              <p className="line-clamp-1 break-all font-semibold hover:underline">
                {displayName}
              </p>

              <p className="line-clamp-1 break-all text-muted-foreground">
                @{username}
              </p>
            </div>
          </Link>

          <Button>Follow</Button>
        </div>
      ))}
    </div>
  );
};

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
        SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+','g'))) AS hashtag, COUNT(*) AS count
        FROM posts
        GROUP BY (hashtag)
        ORDER BY count DESC, hashtag ASC
        LIMIT 5
    `;

    return result.map(({ count, hashtag }) => ({
      hashtag: hashtag,
      count: Number(count),
    }));
  },
  ["trending_topics"],
  { revalidate: 3 * 60 * 60 }
);

const TrendingTopics = async () => {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Trending topics</div>

      {trendingTopics.map(({ count, hashtag }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/hashtag/${title}`} className="block">
            <p
              title={hashtag}
              className="line-clamp-1 break-all font-semibold hover:underline"
            >
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
