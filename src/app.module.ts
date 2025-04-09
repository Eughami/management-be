import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules';
import { ProjectsModule } from './modules/projects';
import { BeneficiairesModule } from './modules/beneficiaires';
import { ExpertsModule } from './modules/experts';
import { OperationFinancesModule } from './modules/operations-finance';
import { OperationTechniquesModule } from './modules/operations-technique';
import { SeederModule } from './modules/seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) ?? 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: false,
      uuidExtension: 'pgcrypto',
    }),
    SeederModule,
    UsersModule,
    ProjectsModule,
    BeneficiairesModule,
    ExpertsModule,
    OperationFinancesModule,
    OperationTechniquesModule,
  ],
})
export class AppModule {}
