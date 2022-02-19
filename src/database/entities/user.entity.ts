import { Exclude } from 'class-transformer';
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  
  @Column({ type: 'varchar', nullable: false })
  public firstName: string;

  @Column({ type: 'varchar', nullable: false })
  public lastName: string;

  @Column({ type: 'varchar', unique: true })
  public email: string;
  
  @Column({ type: "varchar", length: 10, nullable: true })
  public emailVerificationCode: string;

  @Column({ type: "timestamptz", default: null })
  public emailVerifiedAt: Date;

  @Column({ type: 'varchar', nullable: false })
  @Exclude({ toPlainOnly: true })
  public password: string;  

  @Column({ type: 'varchar', nullable: false })
  public organization: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: null })
  public updatedAt: Date;
}
