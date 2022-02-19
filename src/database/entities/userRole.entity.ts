import { Role, User } from 'src/database/entities';
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('roles_users')
export class UserRole {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  
  @ManyToOne(type => User, user => user.userRole)
  public user: User;

  @ManyToOne(type => Role, role => role.id)
  public role: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: null })
  public updatedAt: Date;
}
