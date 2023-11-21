/*
  Warnings:

  - A unique constraint covering the columns `[games]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_games_key" ON "User"("games");
