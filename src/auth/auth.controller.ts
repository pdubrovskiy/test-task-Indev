import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/activate/:email/:activationLink')
  @ApiOperation({ summary: 'Activate email' })
  @ApiResponse({
    status: 200,
    description: 'Email activated successfully',
  })
  activateEmail(
    @Param('email') email: string,
    @Param('activationLink') activationLink: string,
  ) {
    return this.authService.activateEmail(email, activationLink);
  }

  @Get('/forget-password/:email')
  @ApiOperation({ summary: 'Forget password' })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid email',
  })
  forgetPassword(@Param('email') email: string) {
    return this.authService.forgetPassword(email);
  }

  @Post('/reset-password/:email/:resetToken')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid email or reset token',
  })
  resetPassword(
    @Param('email') email: string,
    @Param('resetToken') resetToken: string,
    @Body() newPassword: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(email, resetToken, newPassword);
  }

  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
  })
  @ApiResponse({
    status: 401,
    description: 'Incorrect email or password',
  })
  login(@Body() userDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 200,
    description: 'Registration successful',
  })
  @ApiResponse({
    status: 400,
    description: 'User with this email already exists',
  })
  registration(@Body() userDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.registration(userDto);
  }
}
