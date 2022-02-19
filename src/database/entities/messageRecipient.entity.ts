import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
import { Message,UserRole } from 'src/database/entities';

@Entity('messages_recipients')
export class MessageRecipient {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ManyToOne(type => Message, message => message.id)
  public message: Message;
  
  @ManyToOne(type=> UserRole, userRole=>userRole.id)
  public roleUser: UserRole;

  @Column({ type: 'smallint', nullable: false })
  public messageType: number;

}
