import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  activationLink: string;

  @Column({ nullable: false, default: false })
  isActivated: boolean;

  @Column({ nullable: true })
  resetToken: string;
}
