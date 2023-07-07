import { Module } from '@nestjs/common';
import { ChatsModule } from '@src/chats/chats.module';
import { MessagesController } from '@src/messages/controllers/messages.controller';
import { MessageRepository } from '@src/messages/repositories/messages.repository';
import { GetHistoryMessagesUseCase } from '@src/messages/use-cases/get-history-messages.usecase';
import { SendMessageUseCase } from '@src/messages/use-cases/send-message.usecase';
import { UsersModule } from '@src/users/users.module';
import { WebSocketModule } from '@src/websocket/websocket.module';

@Module({
  imports: [WebSocketModule, ChatsModule, UsersModule],
  controllers: [MessagesController],
  providers: [MessageRepository, SendMessageUseCase, GetHistoryMessagesUseCase],
  exports: [],
})
export class MessagesModule {}
