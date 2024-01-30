import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MonsterModule } from './monster/monster.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@monsterdb.hw3a6qj.mongodb.net',
      { dbName: 'monsterdb' },
    ),
    MonsterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
