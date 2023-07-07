import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from '@src/auth/constants/auth.config';
import { ChatsModule } from '@src/chats/chats.module';
import { ServerGateway } from '@src/websocket/server.gateway';

@Module({
  imports: [
    JwtModule.register({
      secret: authConfig.SECRET,
      signOptions: { expiresIn: authConfig.EXPIRES_IN },
    }),
    ChatsModule,
  ],
  controllers: [],
  providers: [ServerGateway],
  exports: [ServerGateway],
})
export class WebSocketModule {}
