import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { MessageRepository } from '@src/messages/repositories/messages.repository';

@Injectable()
export class GetHistoryMessagesUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(chatCode: string): Promise<Message[]> {
    return await this.messageRepository.getMessagesByChatCode(chatCode);
  }
}
