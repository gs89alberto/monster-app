import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MonsterModule } from './monster/monster.module';
import { ConfigurationService } from '../config/config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('CACHE_TTL'),
        url: configService.get('REDISURL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (_configService: ConfigService) => ({
        uri: _configService.get('MONGODBURL'),
        retryDelay: 500,
        retryAttempts: 3,
        autoIndex: true,
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    MonsterModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigurationService],
})
export class AppModule {}
