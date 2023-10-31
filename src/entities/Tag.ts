import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 100 })
  @Field()
  name!: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  @Field(() => [Ad])
  ads!: Ad[];
}
