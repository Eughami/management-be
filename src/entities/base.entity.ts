import { Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from './abstract.entity';
import { User } from './user.entity';

export abstract class BaseEntity extends AbstractEntity {
  // @ApiProperty({
  //   type: () => User,
  //   description: 'User who created the record',
  //   required: false,
  // })
  @ManyToOne(() => User, (user) => user.id, {
    // Added inverse side reference for potential future use, optional
    nullable: true, // Can system create records?
    onDelete: 'SET NULL', // Or 'RESTRICT' / 'NO ACTION' based on requirements
    eager: false, // Load only when explicitly requested
    // createForeignKeyConstraints: false, // <-- REMOVE this unless you have a VERY specific reason. Let TypeORM manage FKs.
  })
  @JoinColumn({ name: 'created_by_id' }) // Explicit foreign key column name
  created_by: User; // TypeORM handles mapping this correctly

  @ApiProperty({
    description: 'ID of the user who created the record',
    format: 'uuid',
    readOnly: true,
  })
  @Column({ type: 'uuid', nullable: true }) // The actual foreign key column in the DB
  created_by_id: string;

  // --- Updated By ---
  // @ApiProperty({
  //   type: () => User,
  //   description: 'User who last updated the record',
  //   required: false,
  // })
  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: false,
    // createForeignKeyConstraints: false, // <-- REMOVE
  })
  @JoinColumn({ name: 'updated_by_id' })
  updated_by: User;

  @ApiProperty({
    description: 'ID of the user who last updated the record',
    format: 'uuid',
    readOnly: true,
  })
  @Column({ type: 'uuid', nullable: true }) // The actual foreign key column
  updated_by_id: string;
}
