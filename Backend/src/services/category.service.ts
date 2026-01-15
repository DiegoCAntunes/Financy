import { prismaClient } from "../../prisma/prisma";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";

export class CategoryService {
  async createCategory(data: CreateCategoryInput) {
    return prismaClient.category.create({
      data,
    });
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) throw new Error("Category not found");

    return prismaClient.category.update({
      where: { id },
      data,
    });
  }

  async listCategories() {
    return prismaClient.category.findMany({
      orderBy: { title: "asc" },
    });
  }
}
