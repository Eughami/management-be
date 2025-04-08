import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationFinance } from 'src/entities';
import { OperationFinancesController } from './operation-finance.controller';
import { OperationFinancesService } from './operation-finance.service';

@Module({
  imports: [TypeOrmModule.forFeature([OperationFinance])],
  controllers: [OperationFinancesController],
  providers: [OperationFinancesService],
  exports: [OperationFinancesService],
})
export class OperationFinancesModule {}
