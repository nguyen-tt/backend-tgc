import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { validate } from "class-validator";
import {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
} from "../entities/Category";

@Resolver(Category)
export class CategoriesResolver {
  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    const categories = await Category.find({
      relations: { ads: true },
    });
    return categories;
  }

  @Query(() => Category)
  async getCategoryById(
    @Arg("id", () => ID) id: number
  ): Promise<Category | null> {
    const category = await Category.findOne({ where: { id } });
    return category;
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("data", () => CategoryCreateInput) data: CategoryCreateInput
  ): Promise<Category> {
    const newCategory = new Category();
    Object.assign(newCategory, data);

    const errors = await validate(newCategory);
    if (errors.length === 0) {
      await newCategory.save();
      return newCategory;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => CategoryUpdateInput) data: CategoryUpdateInput
  ): Promise<Category> {
    const category = await Category.findOne({
      where: { id },
      relations: { ads: true },
    });
    if (category) {
      Object.assign(category, data, { id: category.id });
      const errors = await validate(category);
      if (errors.length === 0) {
        await category.save();
        return category;
      } else {
        throw new Error(`Error occured: ${JSON.stringify(errors)}`);
      }
    } else {
      throw new Error("Category not found");
    }
  }

  @Mutation(() => Category)
  async deleteCategory(@Arg("id", () => ID) id: number): Promise<any> {
    const category = await Category.findOne({ where: { id } });
    if (category) {
      const deletedCategory = Object.assign({}, category);
      await category.remove();
      return deletedCategory;
    } else {
      throw new Error("Category not found");
    }
  }
}
