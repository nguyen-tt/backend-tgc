import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title!: string;

  @Column()
  description!: string;

  @Column({ length: 100 })
  @Length(1, 100, { message: "Entre 1 et 100 caractères" })
  owner!: string;

  @Column()
  price!: number;

  @Column()
  createdAt!: Date;

  @Column({ length: 100 })
  picture!: string;

  @Column({ length: 100 })
  location!: string;

  @ManyToOne(() => Category, (category) => category.ads)
  category!: Category;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];
}
