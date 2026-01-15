import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { CategoryModel } from "../models/category.model";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";
import { CategoryService } from "../services/category.service";
import { IsAuth } from "../middleware/auth.middleware";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput
  ) {
    return this.categoryService.createCategory(data);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput
  ) {
    return this.categoryService.updateCategory(id, data);
  }

  @Query(() => [CategoryModel])
  async listCategories() {
    return this.categoryService.listCategories();
  }
}
