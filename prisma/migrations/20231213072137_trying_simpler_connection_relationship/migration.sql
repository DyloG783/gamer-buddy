/*
  Warnings:

  - You are about to drop the `Follows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followedById_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_gameId_fkey";

-- DropTable
DROP TABLE "Follows";

-- CreateTable
CREATE TABLE "Connections" (
    "connectedToId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Connections_pkey" PRIMARY KEY ("connectedToId","gameId")
);

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_connectedToId_fkey" FOREIGN KEY ("connectedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
