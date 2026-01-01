const category = [
  {id: 0, category: 'Electronics', color: 'var(--chart-1)', stats: '45'},
  {id: 1, category: 'Furniture', color: 'var(--chart-2)', stats: '25'},
  {id: 2, category: 'Accessories', color: 'var(--chart-3)', stats: '20'},
  {id: 3, category: 'Office Supplies', color: 'var(--chart-4)', stats: '5'},
  {id: 4, category: 'Others', color: 'var(--chart-5)', stats: '5'},
]

export default function CategoryStats() {
  return (
    <ul className="flex flex-col w-full gap-2">
      {category.map(cat => <li key={cat.id} className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className={`size-2.5 rounded-full`} style={{backgroundColor: `${cat.color}`}}></span>
          <span className="font-medium text-[0.9rem]">{cat.category}</span>
        </div>
        <span className="text-gray-500 text-[0.9rem] font-medium">{cat.stats}%</span>
      </li>)}
    </ul>
  );
}
