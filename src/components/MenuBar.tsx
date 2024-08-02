import Link from "next/link";
import { Bell, Bookmark, Home, Mail } from "lucide-react";

import { Button } from "./ui/button";

type Props = {
  className?: string;
};

const MenuBar = ({ className }: Props) => {
  return (
    <div className={className}>
      <Button
        asChild
        title="Home"
        variant="ghost"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      <Button
        asChild
        variant="ghost"
        title="Notifications"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/notifications">
          <Bell />
          <span className="hidden lg:inline">Notifications</span>
        </Link>
      </Button>

      <Button
        asChild
        variant="ghost"
        title="Messages"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/messages">
          <Mail />
          <span className="hidden lg:inline">Messages</span>
        </Link>
      </Button>

      <Button
        asChild
        variant="ghost"
        title="Bookmarks"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </Button>
    </div>
  );
};

export default MenuBar;
