import { Injectable } from '@nestjs/common';
import { ChatRepository } from '@src/chats/repositories/chats.repository';

interface IExecuteParams {
  fromUserId: string;
  page: number;
}

@Injectable()
export class GetChatsUseCase {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute({ page, fromUserId }: IExecuteParams) {
    return await this.chatRepository.getChatsByFromUserId(page, fromUserId);
  }
}
