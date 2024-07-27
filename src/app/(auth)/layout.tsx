import { redirect } from "next/navigation";

import { validateRequest } from "../../../auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await validateRequest();

  if (session.user) redirect("/");

  return <>{children}</>;
};

export default Layout;
