/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Gameforum` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Gameforum" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Gameforum_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Gameforum_id_key" ON "Gameforum"("id");
