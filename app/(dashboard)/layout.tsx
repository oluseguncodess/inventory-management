import DesktopSidebar from "@/components/sidebar/desktop";
import MobileSidebar from "@/components/sidebar/mobile";


export default async function  DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

{

  return (
    <div className="w-full h-screen flex flex-col-reverse md:flex-row">
      <MobileSidebar/>
      <DesktopSidebar />
      {children}
    </div>
  );
}
