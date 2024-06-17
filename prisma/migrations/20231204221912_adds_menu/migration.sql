-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "menu" VARCHAR(1000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);
