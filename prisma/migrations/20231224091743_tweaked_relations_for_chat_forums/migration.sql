/*
  Warnings:

  - You are about to drop the `GameForumMessages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameforumToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameForumMessages" DROP CONSTRAINT "GameForumMessages_forumId_fkey";

-- DropForeignKey
ALTER TABLE "_GameforumToUser" DROP CONSTRAINT "_GameforumToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameforumToUser" DROP CONSTRAINT "_GameforumToUser_B_fkey";

-- DropTable
DROP TABLE "GameForumMessages";

-- DropTable
DROP TABLE "_GameforumToUser";

-- CreateTable
CREATE TABLE "GameForumMessage" (
    "id" SERIAL NOT NULL,
    "forumId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GameForumMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameForumMessage_forumId_key" ON "GameForumMessage"("forumId");

-- AddForeignKey
ALTER TABLE "GameForumMessage" ADD CONSTRAINT "GameForumMessage_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Gameforum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameForumMessage" ADD CONSTRAINT "GameForumMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
