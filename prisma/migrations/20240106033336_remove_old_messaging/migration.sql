/*
  Warnings:

  - You are about to drop the `GameForumMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gameforum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrivateMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameForumMessage" DROP CONSTRAINT "GameForumMessage_forumId_fkey";

-- DropForeignKey
ALTER TABLE "GameForumMessage" DROP CONSTRAINT "GameForumMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "Gameforum" DROP CONSTRAINT "Gameforum_gameId_fkey";

-- DropForeignKey
ALTER TABLE "PrivateMessage" DROP CONSTRAINT "PrivateMessage_recievedById_fkey";

-- DropForeignKey
ALTER TABLE "PrivateMessage" DROP CONSTRAINT "PrivateMessage_sentById_fkey";

-- DropTable
DROP TABLE "GameForumMessage";

-- DropTable
DROP TABLE "Gameforum";

-- DropTable
DROP TABLE "PrivateMessage";

-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ChatRoomId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatRoom_gameId_key" ON "ChatRoom"("gameId");

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_ChatRoomId_fkey" FOREIGN KEY ("ChatRoomId") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
