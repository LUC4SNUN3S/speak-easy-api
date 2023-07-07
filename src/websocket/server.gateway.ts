import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { User } from '@prisma/client';
import { ChatRepository } from '@src/chats/repositories/chats.repository';
import { AllExceptionsFilter } from '@src/websocket/filters/exceptions.filter';
import { Server, Socket } from 'socket.io';

interface IData {
  handshake: {
    headers: {
      auth: string;
    };
  };
}

interface IHandleMessageParams {
  message: string;
  toUserId: string;
  userId: string;
}
interface IUserConnection {
  userId: string;
  socketId: string;
  email: string;
}

const userConnections: Record<string, Socket> = {};

@WebSocketGateway({
  cors: '*',
})
export class ServerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private Logger = new Logger(ServerGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly chatRepository: ChatRepository,
  ) {}

  handleDisconnect(client: Socket): void {
    const user = client['userConn'];

    if (user) {
      delete userConnections[user.id];
    }
    this.Logger.log(`User ${user.id} disconnected websocket`);
  }

  private createConnection(user: User, client: Socket): void {
    const userConn = userConnections[user.id];

    if (userConn) {
      userConn.disconnect();
    }

    client['userConn'] = user.id;

    userConnections[user.id] = client;

    this.Logger.log(`User ${user.email} connected websocket`);
  }

  handleConnection(client: Socket): void {
    try {
      const token = client.handshake.headers.auth as string;
      const user = this.jwtService.verify(token);

      if (!user) {
        throw new WsException('Invalid credentials to connect');
      }

      this.createConnection(user, client);
    } catch (error) {
      client.disconnect();

      this.Logger.error('Failed connection websocket, error: ' + error);
    }
  }

  @UseFilters(new AllExceptionsFilter())
  @UsePipes(new ValidationPipe())
  handleMessage({ toUserId, message, userId }: IHandleMessageParams) {
    const userConn = userConnections[userId];

    if (!userConn) {
      throw new WsException('Ops! Verifique sua conexão');
    }

    const toUserIdConn = userConnections[toUserId];

    if (toUserIdConn) {
      userConn.to(toUserIdConn.id).emit('message', {
        message,
      });
    }
  }
}
