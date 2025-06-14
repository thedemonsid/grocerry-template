import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ProductService } from './product.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateCategoryDTO } from './dto/createCategory.dto';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get all active products' })
  @ApiResponse({ status: 200, description: 'Returns all active products' })
  @Get()
  findAll() {
    return this.productService.getAllProducts();
  }

  @ApiOperation({ summary: 'Get products by category name' })
  @ApiParam({ name: 'categoryName', description: 'Name of the category' })
  @ApiResponse({
    status: 200,
    description: 'Returns products in the specified category',
  })
  @Get('category/:categoryName')
  findByCategory(@Param('categoryName') categoryName: string) {
    return this.productService.getAllProductsWithCategory(categoryName);
  }

  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @Post()
  createProduct(@Body() createProductDTO: CreateProductDTO) {
    return this.productService.createProduct(createProductDTO);
  }
  @ApiOperation({ summary: 'Create a new Category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @Post('category')
  createCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    return this.productService.createCategory(createCategoryDTO);
  }
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Returns all categories' })
  @Get('categories')
  getAllCategories() {
    return this.productService.getAllCategories();
  }
}
