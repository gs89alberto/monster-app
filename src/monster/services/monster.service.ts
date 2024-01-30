import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { UpdateMonsterDto } from '../dto/update-monster.dto';
import { MonsterRepository } from '../repositories/monster.repository';
import { Monster } from '../entities/monster.entity';

@Injectable()
export class MonsterService {
  constructor(private readonly monsterRepository: MonsterRepository) {}

  async create(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    return this.monsterRepository.create(createMonsterDto);
  }

  async findAll(): Promise<Monster[]> {
    return this.monsterRepository.findAll();
  }

  async findOne(id: string): Promise<Monster> {
    const monster = await this.monsterRepository.findOne(id);
    if (!monster) {
      throw new NotFoundException(`Monster with ID ${id} not found`);
    }
    return monster;
  }

  async update(id: string, updateMonsterDto: UpdateMonsterDto): Promise<Monster> {
    const updatedMonster = await this.monsterRepository.update(id, updateMonsterDto);
    if (!updatedMonster) {
      throw new NotFoundException(`Monster with ID ${id} not found`);
    }
    return updatedMonster;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.monsterRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Monster with ID ${id} not found`);
    }
  }
}
