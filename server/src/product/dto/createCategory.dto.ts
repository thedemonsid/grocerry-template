import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDTO {
  @ApiProperty({
    description: 'Category name',
    example: 'Fruits & Vegetables',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'URL-friendly slug for the category',
    example: 'fruits-vegetables',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiPropertyOptional({
    description: 'Category description',
    example: 'Fresh fruits and vegetables, organic and locally sourced',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'URL for category image',
    example: 'https://example.com/images/fruits-category.jpg',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Category visibility status',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
