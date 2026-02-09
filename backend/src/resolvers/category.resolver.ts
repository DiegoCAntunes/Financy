import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CategoryModel } from "../models/category.model";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";
import { CategoryService } from "../services/category.service";
import { IsAuth } from "../middleware/auth.middleware";
import type { GraphqlContext } from "../graphql/context";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @Ctx() ctx: GraphqlContext,
  ) {
    return this.categoryService.createCategory(data, ctx.user);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("id", () => ID) id: string,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Ctx() ctx: GraphqlContext,
  ) {
    return this.categoryService.updateCategory(id, data, ctx.user);
  }

  @Mutation(() => CategoryModel)
  async deleteCategory(@Arg("id", () => ID) id: string, @Ctx() ctx: GraphqlContext) {
    return this.categoryService.deleteCategory(id, ctx.user);
  }

  @Query(() => [CategoryModel])
  async myCategories(@Ctx() ctx: GraphqlContext) {
    return this.categoryService.listCategoriesByUser(ctx.user);
  }
}
