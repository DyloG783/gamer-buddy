-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_connectedToId_fkey";

-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_gameId_fkey";

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_connectedToId_fkey" FOREIGN KEY ("connectedToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
