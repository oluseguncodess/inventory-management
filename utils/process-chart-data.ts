export function processChartData(products: { createdAt: Date; quantity: number }[]) {
  // Group products by month
  const monthlyData = new Map<string, number>();
  
  products.forEach(product => {
    // Format: "January 2026"
    const month = product.createdAt.toLocaleDateString('en-US', { 
      month: 'long',
      year: 'numeric'
    });
    
    monthlyData.set(month, (monthlyData.get(month) || 0) + product.quantity);
  });

  // Convert to array format for recharts
  return Array.from(monthlyData.entries()).map(([month, quantity]) => ({
    month,
    quantity
  }));
}