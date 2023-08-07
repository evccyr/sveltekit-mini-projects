-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "userUserID" INTEGER,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "userID" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userUserID_fkey" FOREIGN KEY ("userUserID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;
