import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    example: 'febffe99-9989-463e-bd2f-061d136ae911',
    description: 'Activation link',
  })
  @Column({ nullable: false })
  activationLink: string;

  @ApiProperty({ example: 'true', description: 'Activation is link used' })
  @Column({ nullable: false, default: false })
  isActivated: boolean;

  @ApiProperty({
    example: 'cb3093b5-6f9f-4c1e-8981-c598124b27db',
    description: 'Token to reset password',
  })
  @Column({ nullable: true })
  resetToken: string;
}
