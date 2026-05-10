import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { VerificationTypesEnum } from '../enums/verification-type.enum';
import { AuthCredentialEntity } from './auth-credential.entity';

@Entity({ name: 'verification_codes' })
@Unique(['credentialId', 'type'])
export class VerificationCodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  code: string;

  @Column({ type: 'enum', enum: VerificationTypesEnum })
  type: VerificationTypesEnum;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date;

  @Column({ name: 'credential_id', type: 'uuid' })
  credentialId: string;

  @ManyToOne(() => AuthCredentialEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'credential_id' })
  credential: AuthCredentialEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
