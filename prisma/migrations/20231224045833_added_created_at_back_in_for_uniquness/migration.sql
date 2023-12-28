/*
  Warnings:

  - The primary key for the `PrivateMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PrivateMessage" DROP CONSTRAINT "PrivateMessage_pkey",
ADD CONSTRAINT "PrivateMessage_pkey" PRIMARY KEY ("sentById", "recievedById", "createdAt");
