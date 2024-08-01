import Link from "next/link";

import UserButton from "./UserButton";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          Bugbook
        </Link>
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
