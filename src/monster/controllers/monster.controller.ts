import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { MonsterService } from '../services/monster.service';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { UpdateMonsterDto } from '../dto/update-monster.dto';

@Controller('monsters')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Post()
  async create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monsterService.create(createMonsterDto);
  }

  @Get()
  async findAll() {
    return this.monsterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.monsterService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMonsterDto: UpdateMonsterDto) {
    return this.monsterService.update(id, updateMonsterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.monsterService.remove(id);
  }
}
