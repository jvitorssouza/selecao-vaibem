import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@modules/authentication/modules/users/infra/typeorm/entities/User';

@Entity('establishments')
export class Establishment {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @IsString()
  @Column({ length: 20 })
  document: string;

  @IsDefined()
  @IsString()
  @Column({ name: 'company_name', length: 100 })
  companyName: string;

  @IsDefined()
  @IsString()
  @Column({ name: 'trade_name', length: 100 })
  tradeName: string;

  @IsDefined()
  @IsString()
  @Column({ name: 'address_street', length: 100 })
  addressStreet: string;

  @IsDefined()
  @IsString()
  @Column({ name: 'address_number', length: 6 })
  addressNumber: string;

  @IsOptional()
  @IsString()
  @Column({ length: 70 })
  complement: string;

  @IsDefined()
  @IsString()
  @Column({ length: 70 })
  neighboorhood: string;

  @IsDefined()
  @IsString()
  @Column({ length: 70 })
  city: string;

  @IsDefined()
  @IsString()
  @Column({ length: 2 })
  state: string;

  @IsDefined()
  @IsString()
  @Column({ name: 'zip_code', length: 12 })
  zipCode: string;

  @IsDefined()
  @IsString()
  @Column({ name: 'phone_number', length: 25 })
  phoneNumber: string;

  @IsDefined()
  @IsString()
  @Column({ length: 100 })
  email: string;

  @IsDefined()
  @IsBoolean()
  @Column({ type: 'boolean' })
  status: boolean;

  @IsDefined()
  @IsNumber()
  @Column({ name: 'owner_user_id' })
  ownerUserId: number;

  @IsOptional()
  @IsNumber()
  @Column({ type: 'float8', precision: 10, scale: 10 })
  lat?: number;

  @IsOptional()
  @IsNumber()
  @Column({ type: 'float8', precision: 10, scale: 10 })
  long?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'owner_user_id' })
  ownerUser?: User;
}
