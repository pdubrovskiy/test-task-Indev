import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Messages } from 'src/constants/messages';
import { generateHash } from 'src/utils/hash-generator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save({
      ...dto,
      activationLink: generateHash(),
    });

    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async activateEmail(activationLink: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { activationLink },
    });
    if (!user) {
      throw new HttpException(Messages.WRONG_LINK, HttpStatus.BAD_REQUEST);
    }
    user.isActivated = true;
    user.resetToken = generateHash();
    await this.userRepository.save({ ...user });
  }

  public async changePassword(
    email: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    user.password = newPassword;
    user.resetToken = generateHash();
    await this.userRepository.save({ ...user });
  }
}
