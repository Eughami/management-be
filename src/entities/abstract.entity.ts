import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @ApiProperty({
    description: 'Unique Identifier (UUID)',
    readOnly: true,
    example: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Creation timestamp', readOnly: true })
  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  created_at: Date;

  @ApiProperty({ description: 'Last update timestamp', readOnly: true })
  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updated_at: Date;

  @ApiProperty({
    description: 'Soft deletion timestamp',
    readOnly: true,
    required: false,
  })
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date; // Make optional in the class too
}
