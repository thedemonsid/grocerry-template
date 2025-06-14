import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/createProduct.dto';
import { CreateCategoryDTO } from './dto/createCategory.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async createProduct(createProductDTO: CreateProductDTO) {
    return this.prisma.client.product.create({
      data: createProductDTO,
    });
  }

  async getAllProducts() {
    return this.prisma.client.product.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async getAllProductsWithCategory(categoryName: string) {
    return this.prisma.client.product.findMany({
      where: {
        category: {
          name: categoryName,
        },
        isActive: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async getProductsByCategoryId(categoryId: string) {
    return this.prisma.client.product.findMany({
      where: {
        categoryId,
        isActive: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async getProductsByCategoryName(categoryName: string) {
    const category = await this.prisma.client.category.findUnique({
      where: {
        name: categoryName,
      },
      select: {
        id: true,
      },
    });

    if (!category) {
      return [];
    }
    return this.getProductsByCategoryId(category.id);
  }
  async createCategory(createCategoryDTO: CreateCategoryDTO) {
    return this.prisma.client.category.create({
      data: createCategoryDTO,
    });
  }
  async getAllCategories() {
    return this.prisma.client.category.findMany();
  }
}
