import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Root,
  FieldResolver,
  UseMiddleware,
  ID,
} from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";
import { TransactionService } from "../services/transaction.service";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { UserModel } from "../models/user.model";
import { IsAuth } from "../middleware/auth.middleware";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService();
  private categoryService = new CategoryService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel,
  ) {
    return this.transactionService.createTransaction(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("id", () => ID) id: string,
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    @GqlUser() user: UserModel,
  ) {
    return this.transactionService.updateTransaction(id, data, user.id);
  }

  @Mutation(() => TransactionModel)
  async deleteTransaction(
    @Arg("id", () => ID) id: string,
    @GqlUser() user: UserModel,
  ) {
    return this.transactionService.deleteTransaction(id, user.id);
  }

  @Query(() => [TransactionModel])
  async myTransactions(@GqlUser() user: UserModel) {
    return this.transactionService.listTransactionsByUser(user.id);
  }

  @FieldResolver(() => CategoryModel)
  async category(@Root() transaction: any, @GqlUser() user: UserModel) {
    const categories = await this.categoryService.listCategoriesByUser(user.id);
    return categories.find((c) => c.id === transaction.categoryId);
  }
}
