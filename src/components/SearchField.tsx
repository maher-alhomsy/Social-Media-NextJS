"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "./ui/input";

const SearchField = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q")!.toString().trim();

    if (!q) return;

    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} action="/search">
      <div className="relative">
        <Input name="q" placeholder="Search..." className="pe-10" />

        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
};

export default SearchField;
