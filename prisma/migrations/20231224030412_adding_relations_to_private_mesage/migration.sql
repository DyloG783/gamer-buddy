/*
  Warnings:

  - The primary key for the `PrivateMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PrivateMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PrivateMessage" DROP CONSTRAINT "PrivateMessage_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PrivateMessage_pkey" PRIMARY KEY ("sentById", "recievedById", "createdAt");

-- AddForeignKey
ALTER TABLE "PrivateMessage" ADD CONSTRAINT "PrivateMessage_sentById_fkey" FOREIGN KEY ("sentById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMessage" ADD CONSTRAINT "PrivateMessage_recievedById_fkey" FOREIGN KEY ("recievedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
