import { gql } from '@apollo/client/core';
import * as ApolloReactCommon from '@apollo/client/core';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type CategoryModel = {
  __typename?: 'CategoryModel';
  color: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type CreateCategoryInput = {
  color: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  icon: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateTransactionInput = {
  amount: Scalars['Float']['input'];
  categoryId: Scalars['String']['input'];
  date: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  type: TransactionType;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: UserModel;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: CategoryModel;
  createTransaction: TransactionModel;
  deleteCategory: CategoryModel;
  deleteTransaction: TransactionModel;
  login: LoginOutput;
  register: RegisterOutput;
  updateCategory: CategoryModel;
  updateTransaction: TransactionModel;
  updateUser: UserModel;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationCreateTransactionArgs = {
  data: CreateTransactionInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTransactionArgs = {
  data: UpdateTransactionInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getUser: UserModel;
  listUsers: Array<UserModel>;
  myCategories: Array<CategoryModel>;
  myTransactions: Array<TransactionModel>;
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterOutput = {
  __typename?: 'RegisterOutput';
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: UserModel;
};

export enum Role {
  Admin = 'admin',
  Member = 'member',
  Owner = 'owner',
  Viewer = 'viewer'
}

export type TransactionModel = {
  __typename?: 'TransactionModel';
  amount: Scalars['Float']['output'];
  category: CategoryModel;
  createdAt: Scalars['DateTimeISO']['output'];
  date: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export enum TransactionType {
  Expense = 'EXPENSE',
  Income = 'INCOME'
}

export type UpdateCategoryInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTransactionInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TransactionType>;
};

export type UpdateUserInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
};

export type UserModel = {
  __typename?: 'UserModel';
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', token: string, refreshToken: string, user: { __typename?: 'UserModel', id: string, name: string, email: string, role?: Role | null } } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterOutput', token: string, refreshToken: string, user: { __typename?: 'UserModel', id: string, name: string, email: string, role?: Role | null } } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserModel', id: string, name: string, email: string, role?: Role | null } };

export type MyCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCategoriesQuery = { __typename?: 'Query', myCategories: Array<{ __typename?: 'CategoryModel', id: string, userId: string, title: string, description?: string | null, icon: string, color: string }> };

export type CreateCategoryMutationVariables = Exact<{
  data: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CategoryModel', id: string, userId: string, title: string, description?: string | null, icon: string, color: string } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'CategoryModel', id: string, userId: string, title: string, description?: string | null, icon: string, color: string } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'CategoryModel', id: string } };

export type MyTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTransactionsQuery = { __typename?: 'Query', myTransactions: Array<{ __typename?: 'TransactionModel', id: string, description: string, amount: number, date: any, type: string, createdAt: any, updatedAt: any, category: { __typename?: 'CategoryModel', id: string, title: string, icon: string, color: string } }> };

export type CreateTransactionMutationVariables = Exact<{
  data: CreateTransactionInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction: { __typename?: 'TransactionModel', id: string, description: string, amount: number, date: any, type: string, createdAt: any, updatedAt: any, category: { __typename?: 'CategoryModel', id: string, title: string, icon: string, color: string } } };

export type UpdateTransactionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UpdateTransactionInput;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction: { __typename?: 'TransactionModel', id: string, description: string, amount: number, date: any, type: string, createdAt: any, updatedAt: any, category: { __typename?: 'CategoryModel', id: string, title: string, icon: string, color: string } } };

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', deleteTransaction: { __typename?: 'TransactionModel', id: string } };


export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    token
    refreshToken
    user {
      id
      name
      email
      role
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    token
    refreshToken
    user {
      id
      name
      email
      role
    }
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: String!, $data: UpdateUserInput!) {
  updateUser(id: $id, data: $data) {
    id
    name
    email
    role
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const MyCategoriesDocument = gql`
    query MyCategories {
  myCategories {
    id
    userId
    title
    description
    icon
    color
  }
}
    `;

/**
 * __useMyCategoriesQuery__
 *
 * To run a query within a React component, call `useMyCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyCategoriesQuery, MyCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyCategoriesQuery, MyCategoriesQueryVariables>(MyCategoriesDocument, options);
      }
export function useMyCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyCategoriesQuery, MyCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyCategoriesQuery, MyCategoriesQueryVariables>(MyCategoriesDocument, options);
        }
// @ts-ignore
export function useMyCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MyCategoriesQuery, MyCategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyCategoriesQuery, MyCategoriesQueryVariables>;
export function useMyCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyCategoriesQuery, MyCategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyCategoriesQuery | undefined, MyCategoriesQueryVariables>;
export function useMyCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyCategoriesQuery, MyCategoriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MyCategoriesQuery, MyCategoriesQueryVariables>(MyCategoriesDocument, options);
        }
export type MyCategoriesQueryHookResult = ReturnType<typeof useMyCategoriesQuery>;
export type MyCategoriesLazyQueryHookResult = ReturnType<typeof useMyCategoriesLazyQuery>;
export type MyCategoriesSuspenseQueryHookResult = ReturnType<typeof useMyCategoriesSuspenseQuery>;
export type MyCategoriesQueryResult = ApolloReactCommon.QueryResult<MyCategoriesQuery, MyCategoriesQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($data: CreateCategoryInput!) {
  createCategory(data: $data) {
    id
    userId
    title
    description
    icon
    color
  }
}
    `;
export type CreateCategoryMutationFn = ApolloReactCommon.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = ApolloReactCommon.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: ID!, $data: UpdateCategoryInput!) {
  updateCategory(id: $id, data: $data) {
    id
    userId
    title
    description
    icon
    color
  }
}
    `;
export type UpdateCategoryMutationFn = ApolloReactCommon.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = ApolloReactCommon.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id) {
    id
  }
}
    `;
export type DeleteCategoryMutationFn = ApolloReactCommon.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = ApolloReactCommon.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const MyTransactionsDocument = gql`
    query MyTransactions {
  myTransactions {
    id
    description
    amount
    date
    type
    category {
      id
      title
      icon
      color
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useMyTransactionsQuery__
 *
 * To run a query within a React component, call `useMyTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTransactionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyTransactionsQuery, MyTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyTransactionsQuery, MyTransactionsQueryVariables>(MyTransactionsDocument, options);
      }
export function useMyTransactionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyTransactionsQuery, MyTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyTransactionsQuery, MyTransactionsQueryVariables>(MyTransactionsDocument, options);
        }
// @ts-ignore
export function useMyTransactionsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MyTransactionsQuery, MyTransactionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyTransactionsQuery, MyTransactionsQueryVariables>;
export function useMyTransactionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyTransactionsQuery, MyTransactionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyTransactionsQuery | undefined, MyTransactionsQueryVariables>;
export function useMyTransactionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyTransactionsQuery, MyTransactionsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MyTransactionsQuery, MyTransactionsQueryVariables>(MyTransactionsDocument, options);
        }
export type MyTransactionsQueryHookResult = ReturnType<typeof useMyTransactionsQuery>;
export type MyTransactionsLazyQueryHookResult = ReturnType<typeof useMyTransactionsLazyQuery>;
export type MyTransactionsSuspenseQueryHookResult = ReturnType<typeof useMyTransactionsSuspenseQuery>;
export type MyTransactionsQueryResult = ApolloReactCommon.QueryResult<MyTransactionsQuery, MyTransactionsQueryVariables>;
export const CreateTransactionDocument = gql`
    mutation CreateTransaction($data: CreateTransactionInput!) {
  createTransaction(data: $data) {
    id
    description
    amount
    date
    type
    category {
      id
      title
      icon
      color
    }
    createdAt
    updatedAt
  }
}
    `;
export type CreateTransactionMutationFn = ApolloReactCommon.MutationFunction<CreateTransactionMutation, CreateTransactionMutationVariables>;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTransactionMutation, CreateTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(CreateTransactionDocument, options);
      }
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult = ApolloReactCommon.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const UpdateTransactionDocument = gql`
    mutation UpdateTransaction($id: ID!, $data: UpdateTransactionInput!) {
  updateTransaction(id: $id, data: $data) {
    id
    description
    amount
    date
    type
    category {
      id
      title
      icon
      color
    }
    createdAt
    updatedAt
  }
}
    `;
export type UpdateTransactionMutationFn = ApolloReactCommon.MutationFunction<UpdateTransactionMutation, UpdateTransactionMutationVariables>;

/**
 * __useUpdateTransactionMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionMutation, { data, loading, error }] = useUpdateTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTransactionMutation, UpdateTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateTransactionMutation, UpdateTransactionMutationVariables>(UpdateTransactionDocument, options);
      }
export type UpdateTransactionMutationHookResult = ReturnType<typeof useUpdateTransactionMutation>;
export type UpdateTransactionMutationResult = ApolloReactCommon.MutationResult<UpdateTransactionMutation>;
export type UpdateTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTransactionMutation, UpdateTransactionMutationVariables>;
export const DeleteTransactionDocument = gql`
    mutation DeleteTransaction($id: ID!) {
  deleteTransaction(id: $id) {
    id
  }
}
    `;
export type DeleteTransactionMutationFn = ApolloReactCommon.MutationFunction<DeleteTransactionMutation, DeleteTransactionMutationVariables>;

/**
 * __useDeleteTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionMutation, { data, loading, error }] = useDeleteTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteTransactionMutation, DeleteTransactionMutationVariables>(DeleteTransactionDocument, options);
      }
export type DeleteTransactionMutationHookResult = ReturnType<typeof useDeleteTransactionMutation>;
export type DeleteTransactionMutationResult = ApolloReactCommon.MutationResult<DeleteTransactionMutation>;
export type DeleteTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>;