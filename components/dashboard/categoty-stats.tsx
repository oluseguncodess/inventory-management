import { queryDatabase } from "@/lib/actions/query-action";

export default async function CategoryStats() {
  const {categoryData} = await queryDatabase()
  return (
    <ul className="flex flex-col w-full gap-2">
      {categoryData.map(cat => <li key={cat.id} className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className={`size-2.5 rounded-full`} style={{backgroundColor: `${cat.color}`}}></span>
          <span className="font-medium text-[0.9rem] capitalize">{cat.category}</span>
        </div>
        <span className="text-gray-500 text-[0.9rem] font-medium">{cat.percentage}%</span>
      </li>)}
    </ul>
  );
}
