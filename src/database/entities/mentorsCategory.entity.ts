import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { UserRole, Category } from 'src/database/entities';

@Entity('mentors_categories')
export class MentorsCategory {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  
  @ManyToOne(type => UserRole , userRole => userRole.id)
  public userRole: UserRole;

  @ManyToOne(type => Category, session => session.id)
  public session: Category;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;
}
