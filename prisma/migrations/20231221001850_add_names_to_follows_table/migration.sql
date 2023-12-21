/*
  Warnings:

  - Added the required column `followedByName` to the `Follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingName` to the `Follows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follows" ADD COLUMN     "followedByName" TEXT NOT NULL,
ADD COLUMN     "followingName" TEXT NOT NULL;
