import { prisma } from "@/prisma";
import { getCurrentUser } from "./auth-requests";

const { id } = getCurrentUser()

const colors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export async function queryDatabase() {
  const [totalProducts, lowStock, allProducts, totalQuantityResult, categoryDataResult] = await Promise.all([
    prisma.product.count({ where: { userId: id } }),
    prisma.product.count({
      where: {
        userId: id,
        lowStockAt: { not: null },
        quantity: { lte: 5 }
      },
    }),
    prisma.product.findMany({
      where: { userId: id },
      select: { price: true, quantity: true, createdAt: true }
    }),
    prisma.product.aggregate({
      where: { userId: id },
      _sum: {
        quantity: true
      }
    }),
    prisma.product.groupBy({
      by: ['category'],
      where: {
        userId: id,
        category: { not: null }
      },
      _count: {
        category: true
      },
      orderBy: {
        _count: {
          category: 'desc'
        }
      }
    })
  ])

  // Handle empty products case
  if (totalProducts === 0) {
    return {
      totalProducts: 0,
      lowStock: 0,
      totalValue: '$0',
      totalQuantity: 0,
      categoryData: [] // Fixed typo: catergoryData -> categoryData
    };
  }

  const top4 = categoryDataResult.slice(0, 4);
  const rest = categoryDataResult.slice(4);

  const categoryData = top4.map((cat, index) => ({ // Fixed typo
    id: index,
    category: cat.category || 'Uncategorized',
    count: cat._count.category,
    percentage: ((cat._count.category / totalProducts) * 100).toFixed(1),
    color: colors[index]
  }));

  if (rest.length > 0) {
    const othersCount = rest.reduce((sum, cat) => sum + cat._count.category, 0);
    categoryData.push({
      id: categoryData.length,
      category: 'Others',
      count: othersCount,
      percentage: ((othersCount / totalProducts) * 100).toFixed(1),
      color: colors[4]
    });
  }

  const totalQuantity = totalQuantityResult._sum.quantity || 0;

  const total = allProducts.reduce((sum, product) =>
    sum + Number(product.price) * Number(product.quantity), 0
  ).toFixed(0);

  const totalValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(Number(total));

  return { totalProducts, lowStock, totalValue, totalQuantity, categoryData }; 
}