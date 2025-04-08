import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'; // <-- Import ManyToOne, JoinColumn
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AbstractEntity } from './abstract.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class User extends AbstractEntity {
  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  name: string;

  // --- Add Auditing Fields Directly to User ---

  // --- Created By (Self-Reference) ---
  @ApiProperty({
    type: () => User,
    description: 'Admin or system user who created this user record',
    required: false,
  })
  @ManyToOne(() => User, {
    // Relation points back to the User entity itself
    nullable: true, // IMPORTANT: Often nullable (e.g., self-registration)
    onDelete: 'SET NULL', // If the creating user is deleted, set this field to NULL
    eager: false, // Lazy load
  })
  @JoinColumn({ name: 'created_by_id' }) // Foreign key column name
  created_by?: User; // Optional because it might be null

  @ApiProperty({
    description: 'ID of the user who created this record',
    format: 'uuid',
    required: false,
  })
  @Column({ type: 'uuid', nullable: true }) // Foreign key column
  created_by_id?: string;

  // --- Updated By (Self-Reference) ---
  @ApiProperty({
    type: () => User,
    description: 'Admin or system user who last updated this user record',
    required: false,
  })
  @ManyToOne(() => User, {
    // Relation points back to the User entity itself
    nullable: true, // Can be null initially or if updated by system
    onDelete: 'SET NULL', // If the updating user is deleted, set this field to NULL
    eager: false, // Lazy load
  })
  @JoinColumn({ name: 'updated_by_id' }) // Foreign key column name
  updated_by?: User; // Optional

  @ApiProperty({
    description: 'ID of the user who last updated this record',
    format: 'uuid',
    required: false,
  })
  @Column({ type: 'uuid', nullable: true }) // Foreign key column
  updated_by_id?: string;

  // Add other user-specific fields here (email, passwordHash, roles, etc.)
}
