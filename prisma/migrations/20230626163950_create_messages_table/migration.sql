-- AlterTable
ALTER TABLE "chats" ALTER COLUMN "total_unread_messages" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" VARCHAR(6000) NOT NULL,
    "chat_code" TEXT NOT NULL,
    "chat_author_id" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_author_id_fkey" FOREIGN KEY ("chat_author_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
