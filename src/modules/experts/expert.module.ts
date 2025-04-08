import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expert } from 'src/entities';
import { ExpertsController } from './expert.controller';
import { ExpertsService } from './expert.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expert])],
  controllers: [ExpertsController],
  providers: [ExpertsService],
  exports: [ExpertsService],
})
export class ExpertsModule {}
