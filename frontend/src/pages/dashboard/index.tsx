import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NewTransactionModal } from "@/components/transactions/new-transaction-modal";
import {
  useMyTransactionsQuery,
  useMyCategoriesQuery,
  useCreateTransactionMutation,
  TransactionType,
  MyTransactionsDocument,
} from "@/graphql/generated";
import {
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  Plus,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getIconComponent, getColorClasses } from "@/lib/category-utils";
import { toast } from "sonner";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(dateString: string): string {
  return format(new Date(dateString), "dd/MM/yy", { locale: ptBR });
}

export default function DashboardPage() {
  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
  } = useMyTransactionsQuery();

  const {
    data: categoriesData,
    loading: categoriesLoading,
  } = useMyCategoriesQuery();

  const [createTransaction] = useCreateTransactionMutation({
    refetchQueries: [{ query: MyTransactionsDocument }],
  });

  const transactions = transactionsData?.myTransactions ?? [];
  const categories = categoriesData?.myCategories ?? [];

  // Calculate summary data from real transactions
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + t.amount, 0);

  const monthlyExpenses = monthlyTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = transactions.reduce((acc, t) => {
    return t.type === "INCOME" ? acc + t.amount : acc - t.amount;
  }, 0);

  // Get recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Calculate category stats
  const categoryStats = categories.map((cat) => {
    const catTransactions = transactions.filter(
      (t) => t.category.id === cat.id && t.type === "EXPENSE"
    );
    return {
      id: cat.id,
      name: cat.title,
      items: catTransactions.length,
      total: catTransactions.reduce((acc, t) => acc + t.amount, 0),
      color: getColorClasses(cat.color).badge,
    };
  }).filter((cat) => cat.items > 0).slice(0, 5);

  const handleCreateTransaction = async (data: {
    type: "expense" | "income";
    description: string;
    date: Date | undefined;
    amount: string;
    category: string;
  }) => {
    if (!data.date || !data.category) return;

    try {
      const numericAmount = parseFloat(data.amount.replace(/\./g, "").replace(",", "."));

      await createTransaction({
        variables: {
          data: {
            description: data.description,
            amount: numericAmount,
            date: data.date.toISOString(),
            type: data.type === "income" ? TransactionType.Income : TransactionType.Expense,
            categoryId: data.category,
          },
        },
      });
      toast.success("Transação criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      toast.error("Erro ao criar transação. Tente novamente.");
    }
  };

  if (transactionsLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (transactionsError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Erro ao carregar dados: {transactionsError.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wallet className="h-4 w-4" />
              <span className="uppercase tracking-wide">Saldo Total</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {formatCurrency(totalBalance)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowUpCircle className="h-4 w-4 text-green-500" />
              <span className="uppercase tracking-wide">Receitas do Mês</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {formatCurrency(monthlyIncome)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowDownCircle className="h-4 w-4 text-red-500" />
              <span className="uppercase tracking-wide">Despesas do Mês</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {formatCurrency(monthlyExpenses)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Transactions */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Transações Recentes
              </h2>
              <Link
                to="/transactions"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Ver todas
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentTransactions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhuma transação encontrada
                </p>
              ) : (
                recentTransactions.map((transaction) => {
                  const Icon = getIconComponent(transaction.category.icon);
                  const type = transaction.type === "INCOME" ? "income" : "expense";
                  const colorClasses = getColorClasses(transaction.category.color);

                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            type === "income"
                              ? "bg-green-50 text-green-600"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge
                          variant="secondary"
                          className={`rounded-full border-0 ${colorClasses.badge}`}
                        >
                          {transaction.category.title}
                        </Badge>
                        <div className="flex items-center gap-2 text-right">
                          <span
                            className={`font-semibold ${
                              type === "income"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {type === "income" ? "+ " : "- "}
                            {formatCurrency(transaction.amount)}
                          </span>
                          <ArrowUpCircle
                            className={`h-5 w-5 ${
                              type === "income"
                                ? "text-green-500"
                                : "text-red-500 rotate-180"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <Separator className="my-6" />

            <NewTransactionModal
              onSubmit={handleCreateTransaction}
              categories={categories}
            >
              <Button
                variant="ghost"
                className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-4 w-4" />
                Nova transação
              </Button>
            </NewTransactionModal>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Categorias
              </h2>
              <Link
                to="/categories"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Gerenciar
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {categoryStats.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhuma categoria com transações
                </p>
              ) : (
                categoryStats.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between"
                  >
                    <Badge
                      variant="secondary"
                      className={`rounded-full border-0 ${category.color} hover:opacity-100`}
                    >
                      {category.name}
                    </Badge>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        {category.items} {category.items === 1 ? "item" : "itens"}
                      </span>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(category.total)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
