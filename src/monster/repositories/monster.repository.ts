import { Monster } from '../entities/monster.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { UpdateMonsterDto } from '../dto/update-monster.dto';

@Injectable()
export class MonsterRepository {
  constructor(
    @InjectModel(Monster.name) private monsterModel: Model<Monster>,
  ) {}

  async create(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    const newMonster = new this.monsterModel(createMonsterDto);
    return newMonster.save();
  }

  async findAll(skip = 0, limit = 8): Promise<Monster[]> {
    return this.monsterModel.find().skip(skip).limit(limit).exec();
  }

  async findOne(id: string): Promise<Monster | null> {
    return this.monsterModel.findById(id).exec();
  }

  async update(
    id: string,
    updateMonsterDto: Partial<UpdateMonsterDto>,
  ): Promise<Monster | null> {
    return this.monsterModel
      .findByIdAndUpdate(id, updateMonsterDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Monster | null> {
    return this.monsterModel.findOneAndDelete({ _id: id }).exec();
  }

  async countDocuments(): Promise<number> {
    return this.monsterModel.countDocuments({}).exec();
  }
}
