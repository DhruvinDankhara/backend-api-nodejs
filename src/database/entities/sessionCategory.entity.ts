import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category, Session } from 'src/database/entities';

@Entity('sessions_categories')
export class SessionCategory {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  
  @ManyToOne(type => Category , cat => cat.id)
  public category: Category;

  @ManyToOne(type => Session, session => session.id)
  public session: Session;
}
