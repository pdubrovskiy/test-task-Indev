import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: '12345678', description: 'New password' })
  @IsString({ message: 'Password - Must be string' })
  @Length(4, 16, {
    message:
      'Password - Must be not shorter than 4 and not longer than 16 symbols',
  })
  readonly newPassword: string;
}
