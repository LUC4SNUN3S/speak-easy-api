import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '@src/auth/decorators/user-auth.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { IUserAuth } from '@src/auth/interfaces/user-auth.interface';
import { ChatOutputDto } from '@src/chats/dtos/chat-output.dto';
import { CreateOrGetChatUseCase } from '@src/chats/use-cases/create-or-get-chat.usecase';
import { GetChatsUseCase } from '@src/chats/use-cases/get-chats.usecase';
import { responseApiOK } from '@src/core/utils/rsponse.util';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(
    private readonly getChatsUseCase: GetChatsUseCase,
    private readonly createOrGetChatUseCase: CreateOrGetChatUseCase,
  ) {}

  @Get()
  async getChatsByFromId(
    @UserAuth() userAuth: IUserAuth,
    @Query('page') page: number,
  ) {
    return this.getChatsUseCase.execute({
      page,
      fromUserId: userAuth.id,
    });
  }

  @Post()
  async CreateOrGetChat(
    @UserAuth() userAuth: IUserAuth,
    @Query('toUserId') toUserId: string,
  ) {
    const chat = await this.createOrGetChatUseCase.execute({
      toUserId,
      userId: userAuth.id,
    });

    if (!chat) {
      return responseApiOK('Chat criado com sucesso!');
    }

    return chat;
  }
}
