import { UserRole } from '../../database/entities';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

@EntityRepository(UserRole)
export class UserRoleRepository extends Repository<UserRole> {
  public async findByUserIdAndRoleId(query: any): Promise<UserRole> {
    const {userId, roleId} = query;
    let criteria = {};
    const where: FindManyOptions["where"] = {};

    if (userId) {
      where.user = userId;
    }

    if (roleId) {
      where.role = roleId;
    }

    criteria = {
      ...criteria,
      where,
      loadRelationsIds: true
    };

    return this.findOne(criteria);
  }
}

