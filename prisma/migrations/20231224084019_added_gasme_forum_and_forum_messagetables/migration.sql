-- CreateTable
CREATE TABLE "Gameforum" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Gameforum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameForumMessages" (
    "id" SERIAL NOT NULL,
    "forumId" INTEGER NOT NULL,

    CONSTRAINT "GameForumMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameforumToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Gameforum_gameId_key" ON "Gameforum"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GameForumMessages_forumId_key" ON "GameForumMessages"("forumId");

-- CreateIndex
CREATE UNIQUE INDEX "_GameforumToUser_AB_unique" ON "_GameforumToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GameforumToUser_B_index" ON "_GameforumToUser"("B");

-- AddForeignKey
ALTER TABLE "Gameforum" ADD CONSTRAINT "Gameforum_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameForumMessages" ADD CONSTRAINT "GameForumMessages_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Gameforum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameforumToUser" ADD CONSTRAINT "_GameforumToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Gameforum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameforumToUser" ADD CONSTRAINT "_GameforumToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
