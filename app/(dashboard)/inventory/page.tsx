import { DataTable } from "@/components/inventory/data-table";
import { queryDatabase } from "@/lib/actions/query-action";

export default async function Inventory() {
  const {inventoryData} = await queryDatabase()
  return (
    <div className="flex-1 p-5 flex flex-col gap-3 md:p-8 md:gap-5 overflow-y-auto max-sm:h-screen">
      <div className="flex">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold md:text-3xl">Inventory</h1>
          <p className="text-[0.75rem] text-gray-500 md:text-sm">
            Overview of your inventory status and recent activities
          </p>
        </div>
      </div>
      <DataTable data={inventoryData}/>
    </div>
  );
}
