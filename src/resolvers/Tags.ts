import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from "../entities/Tag";
import { validate } from "class-validator";

@Resolver(Tag)
export class TagsResolver {
  @Query(() => [Tag])
  async getTags(): Promise<Tag[]> {
    const tags = await Tag.find({
      relations: { ads: true },
    });
    return tags;
  }

  @Query(() => Tag)
  async getTagById(@Arg("id", () => ID) id: number): Promise<Tag | null> {
    const tag = await Tag.findOne({ where: { id } });
    return tag;
  }

  @Mutation(() => Tag)
  async createTag(@Arg("name") name: string): Promise<Tag> {
    const newTag = new Tag();
    newTag.name = name;

    const errors = await validate(newTag);
    if (errors.length === 0) {
      await newTag.save();
      return newTag;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Mutation(() => Tag)
  async updateTag(
    @Arg("id", () => ID) id: number,
    @Arg("name") name: string
  ): Promise<Tag> {
    const tag = await Tag.findOne({ where: { id } });
    if (tag) {
      tag.name = name;
      const errors = await validate(tag);
      if (errors.length === 0) {
        await tag.save();
        return tag;
      } else {
        throw new Error(`Error occured: ${JSON.stringify(errors)}`);
      }
    } else {
      throw new Error("Tag not found");
    }
  }

  @Mutation(() => Tag)
  async deleteTag(@Arg("id", () => ID) id: number): Promise<any> {
    const tag = await Tag.findOne({ where: { id } });
    if (tag) {
      const deletedTag = Object.assign({}, tag);
      await tag.remove();
      return deletedTag;
    } else {
      throw new Error("Tag not found");
    }
  }
}
