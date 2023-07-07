import { Module } from '@nestjs/common';
import { AuthModule } from '@src/auth/auth.module';
import { ChatsModule } from '@src/chats/chats.module';
import { DatabaseModule } from '@src/database/database.module';
import { MessagesModule } from '@src/messages/messages.module';
import { UsersModule } from '@src/users/users.module';
import { WebSocketModule } from '@src/websocket/websocket.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    WebSocketModule,
    ChatsModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
