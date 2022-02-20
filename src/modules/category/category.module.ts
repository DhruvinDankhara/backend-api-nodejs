import { Module } from "@nestjs/common";
import { ConfigModule } from "src/config/config.module";
import { DatabaseModule } from "src/database/database.module";
import { Connection } from "typeorm";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { CategoryRepository } from "src/shared/repository";

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [CategoryController],
  exports: [CategoryService],
  providers: [
    CategoryService,
    {
      provide: CategoryRepository,
      useFactory: (connection: Connection) =>
        connection.getCustomRepository(CategoryRepository),
      inject: [Connection],
    },
  ],
})
export class CategoryModule {}
