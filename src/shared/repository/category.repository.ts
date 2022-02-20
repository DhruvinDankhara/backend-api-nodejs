import { Category } from '../../database/entities';
import { sort } from "src/utils/utils";
import { EntityRepository, FindManyOptions, ILike, Repository } from 'typeorm';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  public async findAll(query) {
    const { query: search } = query;
    let criteria = {};
    const where: FindManyOptions["where"] = {};

    if (search) {
      where.name = ILike(`%${search}%`);
    }

    criteria = {
      ...criteria,
      where,
    };

    criteria = {
      ...criteria,
      select: ["id", "name"],
    };

    criteria = {
      ...criteria,
      order: sort("name-ASC"),
    };

    const records = await this.find(criteria);
    return records.map((record) => ({
      id: record.id,
      name: record.name,
    }));
    
  }
}