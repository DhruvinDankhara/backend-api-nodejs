import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  
  @Column({ type: "timestamptz" })
  public startedAt: Date;

  @Column({ type: "timestamptz", default: null })
  public endedAt: Date;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

}
