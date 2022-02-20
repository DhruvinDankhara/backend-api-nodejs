import { User } from '../../database/entities';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findUserAccountByEmail(query: any): Promise<User> {
    const { email, role } = query;
    console.log(email);
    
    const qb = this.createQueryBuilder("user");
    if (email) {
      qb.andWhere("user.email = :email", { email: email });
    }
    if (role) {
      qb.andWhere("role.name = :role", { role: role });
    }
    qb.leftJoinAndSelect("user.userRole", "userRole");
    qb.leftJoinAndSelect("userRole.role", "role");
    qb.groupBy("user.id")
    qb.addGroupBy("userRole.id")
    qb.addGroupBy("role.id")
    return qb.getOne();
  }
  
  public async findAllMentors(query: any): Promise<any> {
  const {filter, take = 12, skip} = query;
    
    const qb = this.createQueryBuilder("user");
    qb.andWhere("role.name = :role", { role: 'mentor' });
    qb.leftJoin("user.userRole", "userRole");
    qb.leftJoin("userRole.role", "role");
    qb.groupBy("user.id")
    qb.addGroupBy("userRole.id")
    qb.addGroupBy("role.id")
    const [rows, count] = await qb
    .skip(skip)
    .take(take)
    .getManyAndCount();

    return {
      rows,
      count,
    };
  }
  
  public async findById(id): Promise<User> {
    return this.findOne(id, {
      loadRelationIds: true
    });
  }
}
