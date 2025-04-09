import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Column, Entity, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm'; // <-- Import ManyToOne, JoinColumn
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AbstractEntity } from './abstract.entity';
import * as bcrypt from 'bcrypt';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class User extends AbstractEntity {
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  name: string;

  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: true })
  accessToken?: string;

  // @ApiProperty({
  //   type: () => User,
  //   description: 'Admin or system user who created this user record',
  //   readOnly: true,
  // })
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
    readOnly: true,
  })
  @Column({ type: 'uuid', nullable: true }) // Foreign key column
  created_by_id?: string;

  // @ApiProperty({
  //   type: () => User,
  //   description: 'Admin or system user who last updated this user record',
  //   required: false,
  // })
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
    readOnly: true,
  })
  @Column({ type: 'uuid', nullable: true }) // Foreign key column
  updated_by_id?: string;
}
