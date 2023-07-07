import { MessagesValidations as Msgs } from '@src/core/constants/messages-validations';
import { IsNotBlank } from '@src/core/decorators/is-not-blank.decorator';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: Msgs.isString('nome') })
  @IsNotBlank({ message: Msgs.isNotBlank('nome') })
  firstName: string;

  @IsString({ message: Msgs.isString('sobrenome') })
  @IsNotBlank({ message: Msgs.isNotBlank('sobrenome') })
  lastName: string;

  @IsEmail({}, { message: Msgs.isEmail('email') })
  email: string;

  @MaxLength(20, { message: Msgs.maxLength('senha') })
  @MinLength(6, { message: Msgs.minLength('senha') })
  @IsNotBlank({ message: Msgs.isNotBlank('senha') })
  password: string;
}
