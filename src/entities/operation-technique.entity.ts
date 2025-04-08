import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Expert } from './expert.entity';
import { Project } from './project.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class OperationTechnique extends BaseEntity {
  @ApiProperty({ description: 'libelle technique' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  libelle: string;

  @ApiProperty({ description: 'Date debut operation technique' })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'timestamptz', nullable: false })
  date_debut: Date;

  @ApiProperty({ description: 'Date fin operation technique' })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'timestamptz', nullable: false })
  date_fin: Date;

  @ManyToOne(() => Expert, (expert) => expert.operations_technique)
  @JoinColumn({ name: 'expert_id' })
  expert: Expert;

  @ManyToOne(() => Project, (project) => project.operations_technique)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
