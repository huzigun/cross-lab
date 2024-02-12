/*
  Warnings:

  - Added the required column `productOrderId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PAYMENT_WAITING', 'PAYED', 'DELIVERING', 'DELIVERED', 'PURCHASE_DECIDED', 'EXCHANGED', 'CANCELED', 'RETURNED', 'CANCELED_BY_NOPAYMENT');

-- AlterTable
ALTER TABLE "InventoryMovement" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveredDate" TIMESTAMP(3),
ADD COLUMN     "deliveryMethod" TEXT,
ADD COLUMN     "deliveryStatus" TEXT,
ADD COLUMN     "productName" TEXT,
ADD COLUMN     "productOption" TEXT,
ADD COLUMN     "productOrderId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PAYMENT_WAITING';
