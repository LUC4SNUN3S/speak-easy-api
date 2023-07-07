import { Module } from '@nestjs/common';
import { ChatsController } from '@src/chats/controllers/chats.controller';
import { ChatRepository } from '@src/chats/repositories/chats.repository';
import { CreateOrGetChatUseCase } from '@src/chats/use-cases/create-or-get-chat.usecase';
import { GetChatsUseCase } from '@src/chats/use-cases/get-chats.usecase';
import { UsersModule } from '@src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ChatsController],
  providers: [GetChatsUseCase, ChatRepository, CreateOrGetChatUseCase],
  exports: [ChatRepository],
})
export class ChatsModule {}
