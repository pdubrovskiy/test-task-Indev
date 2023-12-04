import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/activate/:email/:activationLink')
  activateEmail(
    @Param('email') email: string,
    @Param('activationLink') activationLink: string,
  ) {
    return this.authService.activateEmail(email, activationLink);
  }

  @Get('/forget-password/:email')
  forgetPassword(@Param('email') email: string) {
    return this.authService.forgetPassword(email);
  }

  @Post('/reset-password/:email/:resetToken')
  resetPassword(
    @Param('email') email: string,
    @Param('resetToken') resetToken: string,
    @Body() newPassword: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(email, resetToken, newPassword);
  }

  @Post('/login')
  login(@Body() userDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.registration(userDto);
  }
}
