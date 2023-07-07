import { MessagesValidations as Msgs } from '@src/core/constants/messages-validations';
import { IsNotBlank } from '@src/core/decorators/is-not-blank.decorator';
import { IsString, MaxLength } from 'class-validator';

export class SendMessageDto {
  @MaxLength(5000, { message: Msgs.maxLength('mensagem') })
  @IsString({ message: Msgs.isString('mensagem') })
  @IsNotBlank({ message: Msgs.isNotBlank('mensagem') })
  message: string;

  @IsNotBlank({ message: Msgs.isNotBlank('destino da mensagem') })
  chatId: string;
}
