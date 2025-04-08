import { CrudValidationGroups } from '@nestjsx/crud';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Project } from './project.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class Beneficiaire extends BaseEntity {
  @ApiProperty({ description: 'nom du beneficaire' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  nom: string;

  @ApiProperty({ description: 'address du beneficaire' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  address: string;

  @ApiProperty({ description: 'tel du beneficaire' })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', nullable: false })
  tel: string;

  @OneToMany(() => Project, (project) => project.beneficiaire)
  projects: Project[];
}
