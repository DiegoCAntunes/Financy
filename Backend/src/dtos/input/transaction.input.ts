import { Field, InputType, Float, registerEnumType } from "type-graphql";

export enum TransactionTypeEnum {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

registerEnumType(TransactionTypeEnum, {
  name: "TransactionType",
});

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  description!: string;

  @Field(() => Float)
  amount!: number;

  @Field(() => Date)
  date!: Date;

  @Field(() => TransactionTypeEnum)
  type!: TransactionTypeEnum;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field(() => Date, { nullable: true })
  date?: Date;

  @Field(() => TransactionTypeEnum, { nullable: true })
  type?: TransactionTypeEnum;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}
