import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Project } from './project.entity';
import { OperationTechnique } from './operation-technique.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class Expert extends BaseEntity {
  @ApiProperty({ description: 'nom du expert' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  nom: string;

  @ApiProperty({ description: 'specialite  expert' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  specialite: string;

  @ApiProperty({ description: 'tel expert' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  tel: string;

  @OneToMany(() => Project, (project) => project.expert)
  projects: Project[];

  @OneToMany(
    () => OperationTechnique,
    (operation_technique) => operation_technique.expert,
  )
  operations_technique: OperationTechnique[];
}
