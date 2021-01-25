import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import path from 'path';

//ConfigService.rootPath = path.resolve(__dirname, '..');

@Module({
  imports: [ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    UsersModule,
  TypeOrmModule.forRootAsync({
    useFactory: (config: ConfigService) => config.get('datebase'),
    inject: [ConfigService]
  }),],
  controllers: [],
  providers: [],
})
export class AppModule { }
