import Image from "next/image";

import { cn } from "@/lib/utils";
import avatatPlaceHolder from "@/assets/avatar-placeholder.png";

type Props = {
  size?: number;
  className?: string;
  avatarUrl?: string | null;
};

const UserAvatar = ({ avatarUrl, className, size }: Props) => {
  return (
    <Image
      src={avatarUrl || avatatPlaceHolder}
      alt="User-avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className
      )}
    />
  );
};

export default UserAvatar;
