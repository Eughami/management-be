import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { SeederService } from './seeder.service';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [SeederService],
  providers: [SeederService],
})
export class SeederModule {}
