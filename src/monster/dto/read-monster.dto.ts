import { IsOptional, IsInt, Min } from 'class-validator';

export class ReadMonsterDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number;

  @IsOptional()
  firstName?: string;
}
