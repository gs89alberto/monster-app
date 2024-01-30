import { IsString, IsNumber, IsOptional, IsArray, IsUrl, Min } from 'class-validator';

export class UpdateMonsterDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  nationalities?: string[];

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  goldBalance?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  speed?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  health?: number;

  @IsString()
  @IsOptional()
  secretNotes?: string;

  @IsString()
  @IsOptional()
  monsterPassword?: string;
}
