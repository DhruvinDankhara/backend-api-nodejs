import { User } from '../../database/entities';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findUserAccountByEmail(query: any): Promise<User> {
    const { email, role } = query;
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
}
