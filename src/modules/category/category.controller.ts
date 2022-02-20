import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiBearerAuth()
@Controller('category')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
  public constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async getAll(@Query() query): Promise<any> {
    return this.categoryService.getAll(query);
  }
}
