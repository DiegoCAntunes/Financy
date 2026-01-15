import { Field, ID, ObjectType, Float, GraphQLISODateTime } from "type-graphql";
import { CategoryModel } from "./category.model";

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  description!: string;

  @Field(() => Float)
  amount!: number;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => String)
  type!: string;

  @Field(() => CategoryModel)
  category!: CategoryModel;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
