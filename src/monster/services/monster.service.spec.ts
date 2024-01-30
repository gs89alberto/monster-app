import { Test, TestingModule } from '@nestjs/testing';
import { MonsterService } from './monster.service';
import { MonsterRepository } from '../repositories/monster.repository';
import { NotFoundException } from '@nestjs/common';
import { Monster } from '../entities/monster.entity';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { UpdateMonsterDto } from '../dto/update-monster.dto';

describe('MonsterService', () => {
  let service: MonsterService;
  let repository: jest.Mocked<MonsterRepository>;

  const mockMonsterEntity = {
    firstName: 'randomFirstName',
    lastName: 'randomLastName',
    title: 'randomTitle',
    gender: 'male',
    health: 100,
    monsterPassword: 'randomPassword',
  } as Monster;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn().mockResolvedValue(mockMonsterEntity),
      findAll: jest.fn().mockResolvedValue([mockMonsterEntity]),
      findOne: jest.fn().mockResolvedValue(mockMonsterEntity),
      update: jest.fn().mockResolvedValue(mockMonsterEntity),
      remove: jest.fn().mockResolvedValue(mockMonsterEntity),
    } as Partial<MonsterRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonsterService,
        { provide: MonsterRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<MonsterService>(MonsterService);
    repository = module.get<MonsterRepository>(
      MonsterRepository,
    ) as jest.Mocked<MonsterRepository>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a monster', async () => {
      const monsterDto: CreateMonsterDto = { ...mockMonsterEntity };
      repository.create.mockResolvedValue(mockMonsterEntity);
      expect(await service.create(monsterDto)).toEqual(mockMonsterEntity);
      expect(repository.create).toHaveBeenCalledWith(monsterDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of monsters', async () => {
      repository.findAll.mockResolvedValue([mockMonsterEntity]);
      expect(await service.findAll()).toEqual([mockMonsterEntity]);
    });
  });

  describe('findOne', () => {
    it('should return a single monster', async () => {
      repository.findOne.mockResolvedValue(mockMonsterEntity);
      expect(await service.findOne('1')).toEqual(mockMonsterEntity);
    });

    it('should throw a NotFoundException if monster not found', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a monster', async () => {
      const updateMonsterDto: UpdateMonsterDto = { firstName: 'UpdatedName' };
      repository.update.mockResolvedValue({
        ...updateMonsterDto,
      } as Monster);
      expect(await service.update('1', updateMonsterDto)).toEqual({
        ...updateMonsterDto,
      });
    });

    it('should throw a NotFoundException if monster not found', async () => {
      repository.update.mockResolvedValue(null);
      await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a monster', async () => {
      repository.remove.mockResolvedValue(mockMonsterEntity);
      expect(await service.remove('1')).toBeUndefined();
    });

    it('should throw a NotFoundException if monster not found', async () => {
      repository.remove.mockResolvedValue(null);
      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
