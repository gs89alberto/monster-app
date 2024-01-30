import { IsString, IsNumber, IsArray, IsOptional, IsUrl, Min } from 'class-validator';

export class CreateMonsterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  title: string;

  @IsString({message: 'Gender must be female/male/other'})
  gender: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true, message: 'Nationalities must be an array of strings'})
  nationalities: string[];

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @Min(0)
  goldBalance: number;

  @IsNumber()
  @Min(0)
  speed: number;

  @IsNumber()
  @Min(0)
  health: number;

  @IsString()
  @IsOptional()
  secretNotes?: string;

  @IsString()
  monsterPassword: string;
}
