import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beneficiaire } from 'src/entities';
import { BeneficiairesController } from './beneficiaire.controller';
import { BeneficiairesService } from './beneficiaire.service';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficiaire])],
  controllers: [BeneficiairesController],
  providers: [BeneficiairesService],
  exports: [BeneficiairesService],
})
export class BeneficiairesModule {}
