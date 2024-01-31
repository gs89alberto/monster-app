import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { UpdateMonsterDto } from '../dto/update-monster.dto';
import { MonsterRepository } from '../repositories/monster.repository';
import { Monster } from '../entities/monster.entity';

@Injectable()
export class MonsterService {
  constructor(
    private readonly monsterRepository: MonsterRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async create(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    return this.monsterRepository.create(createMonsterDto);
  }

  async findAll(skip: number, limit: number) {
    const count = await this.monsterRepository.countDocuments();
    const page_total = Math.floor((count - 1) / limit) + 1;
    return {
      data: await this.monsterRepository.findAll(skip, limit),
      page_total,
      count,
    };
  }

  async findOne(id: string) {
    const checkCacheValue = await this.checkCacheValue(id);
    if (checkCacheValue) return checkCacheValue;
    const monster = await this.monsterRepository.findOne(id);
    if (!monster) {
      throw new NotFoundException(`Monster with ID ${id} not found`);
    }
    this.cacheService.set(id, monster, 10000);
    return monster;
  }

  async update(
    id: string,
    updateMonsterDto: UpdateMonsterDto,
  ): Promise<Monster> {
    if (updateMonsterDto.goldBalance)
      throw new BadRequestException('Update goldBalance is not allowed');
    const updatedMonster = await this.monsterRepository.update(
      id,
      updateMonsterDto,
    );
    if (!updatedMonster) {
      throw new NotFoundException(`Monster with ID ${id} not found`);
    }
    return updatedMonster;
  }

  async updateGoldBalance(id: string, gold: number): Promise<Monster> {
    const monster = await this.monsterRepository.findOne(id);
    if (monster.goldBalance + gold < 0) {
      throw new BadRequestException(
        `Monster current gold balance is ${monster.goldBalance}`,
      );
    }
    monster.goldBalance += gold;
    return await monster.save();
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.monsterRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Monster with ID ${id} not found`);
    }
  }

  checkCacheValue = async (key) => {
    return await this.cacheService.get(key);
  };
}
