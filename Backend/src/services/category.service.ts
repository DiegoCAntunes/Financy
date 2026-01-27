import { prismaClient } from "../../prisma/prisma";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    return prismaClient.category.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryInput,
    userId: string
  ) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) throw new Error("Category not found");
    if (category.userId !== userId) throw new Error("Not authorized");

    return prismaClient.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) throw new Error("Category not found");
    if (category.userId !== userId) throw new Error("Not authorized");

    return prismaClient.category.delete({
      where: { id },
    });
  }

  async listCategoriesByUser(userId: string) {
    return prismaClient.category.findMany({
      where: { userId },
      orderBy: { title: "asc" },
    });
  }
}
