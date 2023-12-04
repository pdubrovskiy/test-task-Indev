import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
  @IsString({ message: 'Email - Must be string' })
  @IsEmail({}, { message: 'Email - Incorrect Email' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString({ message: 'Password - Must be string' })
  @Length(4, 16, {
    message:
      'Password - Must be not shorter than 4 and not longer than 16 symbols',
  })
  readonly password: string;
}
