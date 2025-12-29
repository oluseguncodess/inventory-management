import SectionCards from "./section-card";

export default function Dashboard() {
  return (
    <div className="flex-1 p-5 flex flex-col gap-3 md:p-8 md:gap-5 overflow-y-auto h-screen">
      <div className="flex">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
          <p className="text-[0.75rem] text-gray-500 md:text-sm">
            Overview of your inventory status and recent activities
          </p>
        </div>
      </div>
      <SectionCards/>
    </div>
  );
}
