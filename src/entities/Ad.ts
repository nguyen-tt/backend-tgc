import {Length} from "class-validator";
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
import {Category} from "./Category";
import {Tag} from "./Tag";
import {Field, ID, InputType, ObjectType} from "type-graphql";
import {ObjectId} from "./ObjectId";
import {User} from "./User";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({length: 100})
  @Field()
  title!: string;

  @Column()
  @Field()
  description!: string;

  @Column({length: 100})
  @Length(1, 100, {message: "Entre 1 et 100 caractères"})
  @Field()
  owner!: string;

  @Column()
  @Field()
  price!: number;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @Column({length: 100})
  @Field()
  picture!: string;

  @Column({length: 100})
  @Field()
  location!: string;

  @ManyToOne(() => Category, (category) => category.ads)
  @Field(() => Category, {nullable: true})
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[];

  @ManyToOne(() => User, (user) => user.ads)
  @Field(() => User)
  createdBy!: User;
}

@InputType()
export class AdCreateInput {
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

@InputType()
export class AdUpdateInput {
  @Field({nullable: true})
  title!: string;

  @Field({nullable: true})
  description!: string;

  @Field({nullable: true})
  owner!: string;

  @Field({nullable: true})
  price!: number;

  @Field({nullable: true})
  picture!: string;

  @Field({nullable: true})
  location!: string;

  @Field({nullable: true})
  category!: ObjectId;

  @Field(() => [ObjectId], {nullable: true})
  tags!: ObjectId[];
}

@InputType()
export class AdsWhere {
  @Field(() => [ID], {nullable: true})
  categoryIn?: number[];

  @Field({nullable: true})
  searchTitle?: string;

  @Field({nullable: true})
  priceGte?: number;

  @Field({nullable: true})
  priceLte?: number;
}
