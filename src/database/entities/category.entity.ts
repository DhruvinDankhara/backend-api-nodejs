import { Column, Entity, PrimaryGeneratedColumn, OneToOne, Tree, TreeParent } from 'typeorm';

// Change tree type in future based on requirement
@Tree('materialized-path')
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  
  @Column({ type: 'varchar', nullable: false })
  public name: string;
  
  @Column({ type: 'varchar', length: 1000, nullable: true })
  public description: string;
  
  @TreeParent()
  parent: Category;
  
}

