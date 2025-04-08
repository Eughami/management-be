import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationTechnique } from 'src/entities';
import { OperationTechniquesController } from './operation-technique.controller';
import { OperationTechniquesService } from './operation-technique.service';

@Module({
  imports: [TypeOrmModule.forFeature([OperationTechnique])],
  controllers: [OperationTechniquesController],
  providers: [OperationTechniquesService],
  exports: [OperationTechniquesService],
})
export class OperationTechniquesModule {}
