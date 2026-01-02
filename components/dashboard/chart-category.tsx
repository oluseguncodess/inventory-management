import CategoryStats from "./categoty-stats";
import ChartPieDonutText from "./shadcn-piechart";

export default function ChartCategory() {
  return (
    <div className="flex flex-col items-center justify-between w-full md:max-w-125 md:mx-auto xl:mx-0 xl:w-75 bg-card rounded-2xl p-4 lg:py-10">
      <h3 className="text-xl font-bold">Stock by Category</h3>
      <ChartPieDonutText />
      <CategoryStats />
    </div>
  );
}
