import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
import { validateRequest } from "../../../auth";
import SessionProvider from "@/context/session-provider";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="max-w-7xl mx-auto p-5">{children}</div>
      </div>
    </SessionProvider>
  );
};

export default Layout;
