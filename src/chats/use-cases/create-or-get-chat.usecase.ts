import { Injectable } from '@nestjs/common';
import { Chat, User } from '@prisma/client';
import { ChatRepository } from '@src/chats/repositories/chats.repository';
import { ApiNotfound } from '@src/core/exceptions/exceptions';
import { UserRepository } from '@src/users/repositories/users.repository';

interface IExecuteParams {
  userId: string;
  toUserId: string;
}

interface IApplyValidationsParams {
  fromUser: User;
  toUser: User;
}

@Injectable()
export class CreateOrGetChatUseCase {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository,
  ) {}

  private applyValidations({ fromUser, toUser }: IApplyValidationsParams) {
    if (!fromUser) {
      throw new ApiNotfound('Ops! Usuário de origem não encontrado');
    }

    if (!toUser) {
      throw new ApiNotfound('Ops! Usuário de destino não encontrado');
    }

    if (fromUser.id === toUser.id) {
      throw new ApiNotfound(
        'Ops! Você não pode enviar uma mensagem para você mesmo',
      );
    }
  }

  async execute({ toUserId, userId }: IExecuteParams) {
    const fromUser = await this.userRepository.getUserById(userId);
    const toUser = await this.userRepository.getUserById(toUserId);

    this.applyValidations({ fromUser, toUser });

    const chat = await this.chatRepository.getChatBetweenUserIds({
      fromUserId: String(fromUser.id),
      toUserId: String(toUser.id),
    });

    if (!chat) {
      return await this.chatRepository.createChat({
        fromUserId: String(fromUser.id),
        toUserId: String(toUser.id),
        toUserName: toUser.firstName,
        fromUserName: fromUser.firstName,
      });
    }

    return chat;
  }
}
