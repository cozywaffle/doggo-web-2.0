import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsArray,
} from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(4000)
  content: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  title: string;

  @IsArray()
  tags: string[] | [];

  @IsOptional()
  image_url?: string;
}
