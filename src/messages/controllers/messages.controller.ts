import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '@src/auth/decorators/user-auth.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { IUserAuth } from '@src/auth/interfaces/user-auth.interface';
import { SendMessageDto } from '@src/messages/dtos/send-message.dto';
import { SendMessageUseCase } from '@src/messages/use-cases/send-message.usecase';

import { GetHistoryMessagesUseCase } from '../use-cases/get-history-messages.usecase';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly getHistoryMessagesByChatCode: GetHistoryMessagesUseCase,
  ) {}

  @Post()
  async sendMessage(
    @UserAuth() userAuth: IUserAuth,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    const { chatId, message } = sendMessageDto;
    return await this.sendMessageUseCase.execute({
      sendMessageDto: {
        chatId,
        message,
      },
      userId: userAuth.id,
    });
  }

  @Get('chat/:chatCode')
  getMessagesByChatCode(@Param('chatCode') chatCode: string) {
    return this.getHistoryMessagesByChatCode.execute(chatCode);
  }
}
