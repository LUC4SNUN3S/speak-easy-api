import { MessagesValidations as Msgs } from '@src/core/constants/messages-validations';
import { IsNotBlank } from '@src/core/decorators/is-not-blank.decorator';

export class LoginDto {
  @IsNotBlank({ message: Msgs.isNotBlank('email') })
  email: string;

  @IsNotBlank({ message: Msgs.isNotBlank('senha') })
  password: string;
}
