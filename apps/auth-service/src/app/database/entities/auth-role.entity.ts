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
import { AuthRoleNamesEnum } from '../enums/role-name.enum';
import { AuthCredentialEntity } from './auth-credential.entity';

@Entity({ name: 'auth_roles' })
@Unique(['credentialId', 'name'])
export class AuthRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: AuthRoleNamesEnum })
  name: AuthRoleNamesEnum;

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
