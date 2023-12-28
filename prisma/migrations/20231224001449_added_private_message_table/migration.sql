-- DropIndex
DROP INDEX "User_id_key";

-- CreateTable
CREATE TABLE "PrivateMessage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentById" TEXT NOT NULL,
    "recievedById" TEXT NOT NULL,
    "message" VARCHAR(500) NOT NULL,

    CONSTRAINT "PrivateMessage_pkey" PRIMARY KEY ("id")
);
