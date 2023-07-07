import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';

interface ICreateMessage {
  content: string;
  chatId: string;
  chatCode: string;
}

@Injectable()
export class MessageRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createMessage({ chatId, content, chatCode }: ICreateMessage) {
    const message = this.databaseService.message;

    return message.create({
      data: {
        content,
        chatAuthorId: chatId,
        chatCode,
      },
    });
  }

  async getMessagesByChatCode(chatCode: string) {
    const message = this.databaseService.message;

    return message.findMany({
      where: {
        chatCode,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
