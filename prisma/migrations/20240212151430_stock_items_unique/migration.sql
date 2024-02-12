/*
  Warnings:

  - A unique constraint covering the columns `[productId,engineerId]` on the table `StockItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StockItem_productId_engineerId_key" ON "StockItem"("productId", "engineerId");
