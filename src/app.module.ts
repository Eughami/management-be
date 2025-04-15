import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthModule,
  BeneficiairesModule,
  ExpertsModule,
  OperationFinancesModule,
  OperationTechniquesModule,
  ProjectsModule,
  SeederModule,
  UsersModule,
} from './modules';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards';
import { LoggerConfig } from './config';
import { LoggerModule } from 'nestjs-pino';
import { User } from './entities';

@Module({
  imports: [
    LoggerModule.forRoot(LoggerConfig),
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
    TypeOrmModule.forFeature([User]),
    UsersModule,
    AuthModule,
    SeederModule,
    ProjectsModule,
    BeneficiairesModule,
    ExpertsModule,
    OperationFinancesModule,
    OperationTechniquesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
