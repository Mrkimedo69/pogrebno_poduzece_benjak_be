import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    WORKER = 'worker',
    USER = 'user',
  }
  
  @Entity()
  export class Users {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @Column()
    fullName: string;
  
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  