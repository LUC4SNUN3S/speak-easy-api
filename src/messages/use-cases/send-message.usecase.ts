import { Injectable } from '@nestjs/common';
import { Chat, User } from '@prisma/client';
import { ChatRepository } from '@src/chats/repositories/chats.repository';
import { ApiNotfound } from '@src/core/exceptions/exceptions';
import { SendMessageDto } from '@src/messages/dtos/send-message.dto';
import { MessageRepository } from '@src/messages/repositories/messages.repository';
import { UserRepository } from '@src/users/repositories/users.repository';
import { ServerGateway } from '@src/websocket/server.gateway';

interface IExecuteParams {
  userId: string;
  sendMessageDto: SendMessageDto;
}

interface IValidationParams {
  user: User;
  chat: Chat;
}

@Injectable()
export class SendMessageUseCase {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
    private readonly webSocketServer: ServerGateway,
  ) {}

  private applyValidations({ chat, user }: IValidationParams) {
    if (!chat) {
      throw new ApiNotfound('Ops! Chat não encontrado');
    }

    if (!user) {
      throw new ApiNotfound('Ops! Usuário não encontrado');
    }

    if (chat.fromUserId !== user.id) {
      throw new ApiNotfound(
        'Ops! Você não tem permissão para enviar mensagens neste chat',
      );
    }
  }

  async execute({ sendMessageDto, userId }: IExecuteParams) {
    const chat = await this.chatRepository.getChatById(sendMessageDto.chatId);
    const user = await this.userRepository.getUserById(userId);

    this.applyValidations({
      chat,
      user,
    });

    await this.messageRepository.createMessage({
      chatId: chat.id,
      content: sendMessageDto.message,
      chatCode: chat.chatCode,
    });

    this.webSocketServer.handleMessage({
      toUserId: chat.toUserId,
      userId: user.id,
      message: sendMessageDto.message,
    });
  }
}
