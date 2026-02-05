import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  Plus,
  ChevronRight,
  Utensils,
  Car,
  ShoppingCart,
  Banknote,
  TrendingUp,
} from "lucide-react";

// Mock data
const summaryData = {
  totalBalance: 12847.32,
  monthlyIncome: 4250.0,
  monthlyExpenses: 2180.45,
};

const recentTransactions = [
  {
    id: "1",
    title: "Pagamento de Salário",
    date: "01/12/25",
    category: "Receita",
    type: "income" as const,
    amount: 4250.0,
    icon: Banknote,
  },
  {
    id: "2",
    title: "Jantar no Restaurante",
    date: "30/11/25",
    category: "Alimentação",
    type: "expense" as const,
    amount: 89.5,
    icon: Utensils,
  },
  {
    id: "3",
    title: "Posto de Gasolina",
    date: "29/11/25",
    category: "Transporte",
    type: "expense" as const,
    amount: 100.0,
    icon: Car,
  },
  {
    id: "4",
    title: "Compras no Mercado",
    date: "28/11/25",
    category: "Mercado",
    type: "expense" as const,
    amount: 156.8,
    icon: ShoppingCart,
  },
  {
    id: "5",
    title: "Retorno de Investimento",
    date: "26/11/25",
    category: "Investimento",
    type: "income" as const,
    amount: 340.25,
    icon: TrendingUp,
  },
];

const categories = [
  { name: "Alimentação", items: 12, total: 542.3, color: "bg-green-100 text-green-700" },
  { name: "Transporte", items: 8, total: 385.5, color: "bg-yellow-100 text-yellow-700" },
  { name: "Mercado", items: 3, total: 298.75, color: "bg-lime-100 text-lime-700" },
  { name: "Entretenimento", items: 2, total: 186.2, color: "bg-orange-100 text-orange-700" },
  { name: "Utilidades", items: 7, total: 245.8, color: "bg-amber-100 text-amber-700" },
];

const categoryColors: Record<string, string> = {
  Receita: "bg-green-100 text-green-700",
  Alimentação: "bg-amber-100 text-amber-700",
  Transporte: "bg-yellow-100 text-yellow-700",
  Mercado: "bg-lime-100 text-lime-700",
  Investimento: "bg-emerald-100 text-emerald-700",
};

const iconBgColors: Record<string, string> = {
  income: "bg-green-50 text-green-600",
  expense: "bg-zinc-100 text-zinc-600",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function DashboardPage() {
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
              {formatCurrency(summaryData.totalBalance)}
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
              {formatCurrency(summaryData.monthlyIncome)}
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
              {formatCurrency(summaryData.monthlyExpenses)}
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
              {recentTransactions.map((transaction) => {
                const Icon = transaction.icon;
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          iconBgColors[transaction.type]
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {transaction.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          categoryColors[transaction.category]
                        }`}
                      >
                        {transaction.category}
                      </span>
                      <div className="flex items-center gap-2 text-right">
                        <span
                          className={`font-semibold ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+ " : "- "}
                          {formatCurrency(transaction.amount)}
                        </span>
                        <ArrowUpCircle
                          className={`h-5 w-5 ${
                            transaction.type === "income"
                              ? "text-green-500"
                              : "text-red-500 rotate-180"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              variant="ghost"
              className="mt-6 w-full justify-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
              Nova transação
            </Button>
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
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${category.color}`}
                    >
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      {category.items} itens
                    </span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(category.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
