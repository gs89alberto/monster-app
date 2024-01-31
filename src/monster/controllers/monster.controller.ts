import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { MonsterService } from '../services/monster.service';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { UpdateMonsterDto } from '../dto/update-monster.dto';
import { Monster } from '../entities/monster.entity';
import { RolesGuard } from '../guards/roles.guards';

@Controller('monsters')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @UseGuards(new RolesGuard('admin'))
  @Post()
  async create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monsterService.create(createMonsterDto);
  }

  @Get()
  async findAll(@Query() { skip = 0, limit = 8 }) {
    return this.monsterService.findAll(skip, limit);
  }

  @UseGuards(new RolesGuard('admin'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.monsterService.findOne(id);
  }

  @UseGuards(new RolesGuard('admin'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMonsterDto: UpdateMonsterDto,
  ) {
    return this.monsterService.update(id, updateMonsterDto);
  }

  @UseGuards(new RolesGuard('CEO'))
  @Patch(':id/gold')
  async updateGold(
    @Param('id') id: string,
    @Body('gold') gold: number,
  ): Promise<Monster> {
    return this.monsterService.updateGoldBalance(id, gold);
  }

  @UseGuards(new RolesGuard('admin'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.monsterService.remove(id);
  }
}
