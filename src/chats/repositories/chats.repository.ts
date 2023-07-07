import { Injectable } from '@nestjs/common';
import { Chat, Prisma } from '@prisma/client';
import { ChatTypeEnum } from '@src/chats/enums/chat-type.enum';
import { paginate } from '@src/core/utils/pagination-prisma.util';
import { DatabaseService } from '@src/database/database.service';
import { randomUUID } from 'node:crypto';

interface IGetChatsByFromUserIdsParams {
  fromUserId: string;
  toUserId: string;
}

interface ICreateChatParams {
  fromUserId: string;
  toUserId: string;
  toUserName: string;
  fromUserName: string;
}

@Injectable()
export class ChatRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getChatsByFromUserId(page: number, fromUserId: string) {
    const chats = this.databaseService.chat;

    return paginate<Chat, Prisma.ChatFindManyArgs>(
      chats,
      {
        where: {
          fromUserId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      { page },
    );
  }

  async getChatBetweenUserIds({
    fromUserId,
    toUserId,
  }: IGetChatsByFromUserIdsParams): Promise<Chat> {
    return this.databaseService.chat.findFirst({
      where: {
        fromUserId,
        toUserId,
      },
    });
  }

  async getChatById(chatId: string): Promise<any> {
    return this.databaseService.chat.findUnique({
      where: {
        id: String(chatId),
      },
    });
  }

  async createChat({
    fromUserId,
    toUserId,
    toUserName,
    fromUserName,
  }: ICreateChatParams) {
    return this.databaseService.$transaction(async (transaction) => {
      const chatCode = randomUUID();
      const createChatMeToHim = await transaction.chat.create({
        data: {
          fromUserId,
          toUserId,
          name: toUserName,
          chatCode,
          type: ChatTypeEnum.PRIVATE,
        },
      });

      const createChatHeToMe = await transaction.chat.create({
        data: {
          fromUserId: toUserId,
          toUserId: fromUserId,
          name: fromUserName,
          chatCode,
          type: ChatTypeEnum.PRIVATE,
        },
      });

      return { createChatHeToMe, createChatMeToHim };
    });
  }
}
