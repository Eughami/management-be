import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules';

console.log(__dirname + '/migrations/**/*{.ts,.js}');
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'imam',
      password: 'imam',
      database: 'imam',
      schema: 'vincent',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: false,
      uuidExtension: 'pgcrypto',
    }),
    UsersModule,
  ],
})
export class AppModule {}
