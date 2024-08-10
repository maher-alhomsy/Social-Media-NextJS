import Link from "next/link";

import { PostData } from "@/lib/types";
import UserAvatar from "../UserAvatar";
import { formatRelativeData } from "@/lib/utils";

type Props = {
  post: PostData;
};

const Post = ({ post }: Props) => {
  return (
    <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Link href={`/users/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.avatarUrl} />
        </Link>

        <div>
          <Link
            href={`/users/${post.user.username}`}
            className="block font-medium hover:underline"
          >
            {post.user.displayName}
          </Link>

          <Link
            href={`/posts/${post.id}`}
            className="block text-sm text-muted-foreground hover:underline"
          >
            {/* {formatRelativeData(post.createdAt)} */}
          </Link>
        </div>
      </div>

      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
};

export default Post;
