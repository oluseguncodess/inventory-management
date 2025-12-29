import DesktopSidebar from "@/components/sidebar/desktop";
import MobileSidebar from "@/components/sidebar/mobile";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="w-full flex flex-col-reverse md:flex-row ">
      <MobileSidebar />
      <DesktopSidebar />
      {children}
    </div>
  );
}
