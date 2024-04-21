-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionID" SERIAL NOT NULL,
    "budgetID" INTEGER NOT NULL,
    "categoryID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionID")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryID" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryID")
);

-- CreateTable
CREATE TABLE "Budget" (
    "budgetID" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("budgetID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_budgetID_key" ON "Transaction"("budgetID");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_categoryID_key" ON "Transaction"("categoryID");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_userId_key" ON "Budget"("userId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_budgetID_fkey" FOREIGN KEY ("budgetID") REFERENCES "Budget"("budgetID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category"("categoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
