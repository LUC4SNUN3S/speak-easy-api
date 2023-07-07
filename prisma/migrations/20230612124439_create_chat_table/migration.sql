-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "chat_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "total_unread_messages" INTEGER NOT NULL DEFAULT 0,
    "from_user_id" TEXT,
    "to_user_id" TEXT,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);
