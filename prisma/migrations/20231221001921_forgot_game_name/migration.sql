/*
  Warnings:

  - Added the required column `gameName` to the `Follows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follows" ADD COLUMN     "gameName" TEXT NOT NULL;
