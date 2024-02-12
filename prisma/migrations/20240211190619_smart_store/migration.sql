-- CreateTable
CREATE TABLE "SmartStore" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "token" TEXT,

    CONSTRAINT "SmartStore_pkey" PRIMARY KEY ("id")
);
