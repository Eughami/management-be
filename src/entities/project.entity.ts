import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Beneficiaire } from './beneficiaire.entity';
import { Expert } from './expert.entity';
import { OperationFinance } from './operation-finance.entity';
import { OperationTechnique } from './operation-technique.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class Project extends BaseEntity {
  @ApiProperty({ description: 'nom du projet' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  nom: string;

  @ApiProperty({ description: 'Date acquisition du projet' })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'timestamptz', nullable: false })
  date_acquisition: Date;

  @ApiProperty({ description: 'date debut du projet' })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'timestamptz', nullable: false })
  date_debut: Date;

  @ApiProperty({ description: 'date fin du projet' })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'timestamptz', nullable: false })
  date_fin: Date;

  @ApiProperty({ description: 'date cloture du projet' })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'timestamptz', nullable: false })
  date_cloture: Date;

  @ApiProperty({ description: 'Budget du projet' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'bigint', nullable: false })
  budget: number;

  @ManyToOne(() => Beneficiaire, (beneficiaire) => beneficiaire.projects)
  @JoinColumn({ name: 'beneficiaire_id' })
  beneficiaire: Beneficiaire;

  @OneToMany(
    () => OperationFinance,
    (operation_finance) => operation_finance.project,
  )
  operations_finance: OperationFinance[];

  @ManyToOne(() => Expert, (expert) => expert.projects)
  @JoinColumn({ name: 'expert_id' })
  expert: Expert;

  @OneToMany(
    () => OperationTechnique,
    (operation_technique) => operation_technique.project,
  )
  operations_technique: OperationTechnique[];
}
