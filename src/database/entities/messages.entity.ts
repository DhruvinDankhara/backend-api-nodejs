import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
import { Session } from 'src/database/entities';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ManyToOne(type => Session, session => session.id)
  public session: Session;
  
  @Column({ type: 'varchar', nullable: true })
  public message: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @Column({ type: 'smallint', nullable: false })
  public messageType: number;

}
