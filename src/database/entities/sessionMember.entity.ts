 import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole, Session } from 'src/database/entities';

@Entity('sessions_members')
export class SessionMember {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  
  @ManyToOne(type => Session , session => session.id)
  public session: Session;

  @ManyToOne(type => UserRole, userRole => userRole.id)
  public userRole: UserRole;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: null })
  public updatedAt: Date;
}
