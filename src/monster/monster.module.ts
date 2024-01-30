import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Monster, MonsterSchema } from './entities/monster.entity';
import { MonsterController } from './controllers/monster.controller';
import { MonsterService } from './services/monster.service';
import { MonsterRepository } from './repositories/monster.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Monster.name, schema: MonsterSchema }])],
  controllers: [MonsterController],
  providers: [MonsterService, MonsterRepository],
})
export class MonsterModule {}
