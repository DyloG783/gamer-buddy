/*
  Warnings:

  - You are about to drop the column `userId` on the `PrivateMessage` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `PrivateMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `PrivateMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PrivateMessage" DROP CONSTRAINT "PrivateMessage_userId_fkey";

-- AlterTable
ALTER TABLE "PrivateMessage" DROP COLUMN "userId",
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PrivateMessage" ADD CONSTRAINT "PrivateMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMessage" ADD CONSTRAINT "PrivateMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
