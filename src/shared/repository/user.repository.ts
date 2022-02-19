import { User } from '../../database/entities';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findUserAccountByEmail(query: any): Promise<User> {
    const { email, roleId } = query;
    const qb = this.createQueryBuilder("user");
    if (email) {
      qb.andWhere("user.email = :email", { email: email });
    }
    if (roleId) {
      qb.andWhere("userRole.role = :role", { role: roleId });
    }
    // qb.select([
    //   "user.id as id",
    //   "user.password as password",
    // ])
    qb.leftJoinAndSelect("user.userRole", "userRole");
    qb.leftJoinAndSelect("userRole.role", "role");
    qb.groupBy("user.id")
    qb.addGroupBy("userRole.id")
    qb.addGroupBy("role.id")
    return qb.getOne();
  }
}
