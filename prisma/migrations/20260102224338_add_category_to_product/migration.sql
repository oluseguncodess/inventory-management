-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" TEXT;

-- CreateIndex
CREATE INDEX "Product_userId_category_idx" ON "Product"("userId", "category");
