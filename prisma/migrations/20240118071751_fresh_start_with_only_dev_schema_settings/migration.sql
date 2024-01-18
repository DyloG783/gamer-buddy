-- CreateTable
CREATE TABLE "TwitchAuthToken" (
    "type" TEXT NOT NULL,
    "twitchAuthToken" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ChatGameRoom" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "ChatGameRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameRoomId" TEXT NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GameMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatPrivateRoom" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user1Email" TEXT NOT NULL,
    "user2Email" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "ChatPrivateRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateMessage" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" VARCHAR(500) NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chatPrivateRoomId" TEXT NOT NULL,

    CONSTRAINT "PrivateMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userName" TEXT,
    "email" TEXT NOT NULL,
    "bio" TEXT,
    "timezone" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follows" (
    "followedByEmail" TEXT NOT NULL,
    "followingEmail" TEXT NOT NULL,
    "followedById" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "followedByUName" TEXT NOT NULL,
    "followingUName" TEXT NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("followingEmail","followedByEmail")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT,
    "url" TEXT,
    "firstReleaseDate" INTEGER,
    "genres" TEXT[],
    "modes" TEXT[],
    "platforms" TEXT[],

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platform" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mode" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TwitchAuthToken_type_key" ON "TwitchAuthToken"("type");

-- CreateIndex
CREATE UNIQUE INDEX "ChatGameRoom_gameId_key" ON "ChatGameRoom"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatPrivateRoom_id_key" ON "ChatPrivateRoom"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_id_key" ON "Platform"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Mode_id_key" ON "Mode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToUser_AB_unique" ON "_GameToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToUser_B_index" ON "_GameToUser"("B");

-- AddForeignKey
ALTER TABLE "ChatGameRoom" ADD CONSTRAINT "ChatGameRoom_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameMessage" ADD CONSTRAINT "GameMessage_gameRoomId_fkey" FOREIGN KEY ("gameRoomId") REFERENCES "ChatGameRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameMessage" ADD CONSTRAINT "GameMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMessage" ADD CONSTRAINT "PrivateMessage_chatPrivateRoomId_fkey" FOREIGN KEY ("chatPrivateRoomId") REFERENCES "ChatPrivateRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMessage" ADD CONSTRAINT "PrivateMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followedByEmail_fkey" FOREIGN KEY ("followedByEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingEmail_fkey" FOREIGN KEY ("followingEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToUser" ADD CONSTRAINT "_GameToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToUser" ADD CONSTRAINT "_GameToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
