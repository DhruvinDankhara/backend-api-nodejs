import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  // Remove Nullable after implementation authentication of user
  @Column({ type: "varchar", length: 300, nullable: true })
  createdBy: string;

  @UpdateDateColumn({ type: "timestamptz", default: null })
  updatedAt: Date;

  // Remove Nullable after implementation authentication of user
  @Column({ type: "varchar", length: 300, nullable: true })
  updatedBy: string;

  @DeleteDateColumn({ default: null })
  deletedAt?: Date;
}
