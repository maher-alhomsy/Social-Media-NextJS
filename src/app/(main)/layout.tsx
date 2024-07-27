import { redirect } from "next/navigation";

import { validateRequest } from "../../../auth";
import SessionProvider from "@/context/session-provider";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return <SessionProvider value={session}>{children}</SessionProvider>;
};

export default Layout;
