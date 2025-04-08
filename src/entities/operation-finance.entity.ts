import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Project } from './project.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class OperationFinance extends BaseEntity {
  @ApiProperty({ description: 'libelle finance' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  libelle_finan: string;

  @ApiProperty({ description: 'depense finance' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'bigint', nullable: false })
  depense: number;

  @ApiProperty({ description: 'montant_entree finance ' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'bigint', nullable: false })
  montant_entree: number;

  @ApiProperty({ description: 'gain finance ' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'bigint', nullable: false })
  gain: number;

  @ApiProperty({ description: 'observation finance' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  observation: string;

  @ManyToOne(() => Project, (project) => project.operations_finance)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
