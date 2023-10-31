import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { ObjectId } from "./ObjectId";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 100 })
  @Field()
  title!: string;

  @Column()
  @Field()
  description!: string;

  @Column({ length: 100 })
  @Length(1, 100, { message: "Entre 1 et 100 caractères" })
  @Field()
  owner!: string;

  @Column()
  @Field()
  price!: number;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @Column({ length: 100 })
  @Field()
  picture!: string;

  @Column({ length: 100 })
  @Field()
  location!: string;

  @ManyToOne(() => Category, (category) => category.ads)
  @Field(() => Category, { nullable: true })
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[];
}

@InputType()
export class AdInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  owner!: string;

  @Field()
  price!: number;

  @Field()
  picture!: string;

  @Field()
  location!: string;

  @Field()
  category!: ObjectId;

  @Field(() => [ObjectId])
  tags!: ObjectId[];
}
