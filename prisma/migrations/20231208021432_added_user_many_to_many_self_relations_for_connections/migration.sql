/*
  Warnings:

  - You are about to drop the column `externalId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `gameGenreNames` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `gameModeNames` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `gameModes` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `genres` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `platformNames` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `platforms` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the column `games` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `GameMode` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Platform` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Game_externalId_key";

-- DropIndex
DROP INDEX "Genre_externalId_key";

-- DropIndex
DROP INDEX "Platform_externalId_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "externalId",
DROP COLUMN "gameGenreNames",
DROP COLUMN "gameModeNames",
DROP COLUMN "gameModes",
DROP COLUMN "genres",
DROP COLUMN "platformNames",
DROP COLUMN "platforms",
ADD COLUMN     "genreIds" INTEGER[],
ADD COLUMN     "modeIds" INTEGER[],
ADD COLUMN     "platformIds" INTEGER[],
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Game_id_seq";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "externalId",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Genre_id_seq";

-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "externalId",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Platform_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "games";

-- DropTable
DROP TABLE "GameMode";

-- CreateTable
CREATE TABLE "Mode" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFollows" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GameToPlatform" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GameToMode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GameToGenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GameToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Mode_id_key" ON "Mode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "_UserFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollows_B_index" ON "_UserFollows"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToPlatform_AB_unique" ON "_GameToPlatform"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToPlatform_B_index" ON "_GameToPlatform"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToMode_AB_unique" ON "_GameToMode"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToMode_B_index" ON "_GameToMode"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToGenre_AB_unique" ON "_GameToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToGenre_B_index" ON "_GameToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToUser_AB_unique" ON "_GameToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToUser_B_index" ON "_GameToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_id_key" ON "Platform"("id");

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPlatform" ADD CONSTRAINT "_GameToPlatform_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPlatform" ADD CONSTRAINT "_GameToPlatform_B_fkey" FOREIGN KEY ("B") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToMode" ADD CONSTRAINT "_GameToMode_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToMode" ADD CONSTRAINT "_GameToMode_B_fkey" FOREIGN KEY ("B") REFERENCES "Mode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGenre" ADD CONSTRAINT "_GameToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGenre" ADD CONSTRAINT "_GameToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToUser" ADD CONSTRAINT "_GameToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToUser" ADD CONSTRAINT "_GameToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
