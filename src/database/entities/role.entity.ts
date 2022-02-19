import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class User {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  
  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: null })
  public updatedAt: Date;
}
