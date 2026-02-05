import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  ArrowUpCircle,
  ArrowDownCircle,
  Trash2,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Car,
  ShoppingCart,
  TrendingUp,
  Home,
  Briefcase,
  Film,
} from "lucide-react";

// Mock data
const mockTransactions = [
  {
    id: "1",
    title: "Jantar no Restaurante",
    date: "30/11/25",
    category: "Alimentação",
    type: "expense" as const,
    amount: 89.5,
    icon: Utensils,
  },
  {
    id: "2",
    title: "Posto de Gasolina",
    date: "29/11/25",
    category: "Transporte",
    type: "expense" as const,
    amount: 100.0,
    icon: Car,
  },
  {
    id: "3",
    title: "Compras no Mercado",
    date: "28/11/25",
    category: "Mercado",
    type: "expense" as const,
    amount: 156.8,
    icon: ShoppingCart,
  },
  {
    id: "4",
    title: "Retorno de Investimento",
    date: "26/11/25",
    category: "Investimento",
    type: "income" as const,
    amount: 340.25,
    icon: TrendingUp,
  },
  {
    id: "5",
    title: "Aluguel",
    date: "26/11/25",
    category: "Utilidades",
    type: "expense" as const,
    amount: 1700.0,
    icon: Home,
  },
  {
    id: "6",
    title: "Freelance",
    date: "24/11/25",
    category: "Salário",
    type: "income" as const,
    amount: 2500.0,
    icon: Briefcase,
  },
  {
    id: "7",
    title: "Compras Jantar",
    date: "22/11/25",
    category: "Mercado",
    type: "expense" as const,
    amount: 150.0,
    icon: ShoppingCart,
  },
  {
    id: "8",
    title: "Cinema",
    date: "18/12/25",
    category: "Entretenimento",
    type: "expense" as const,
    amount: 88.0,
    icon: Film,
  },
];

const categories = [
  "Todas",
  "Alimentação",
  "Transporte",
  "Mercado",
  "Investimento",
  "Utilidades",
  "Salário",
  "Entretenimento",
];

const categoryColors: Record<string, string> = {
  Alimentação: "bg-amber-100 text-amber-700",
  Transporte: "bg-yellow-100 text-yellow-700",
  Mercado: "bg-lime-100 text-lime-700",
  Investimento: "bg-emerald-100 text-emerald-700",
  Utilidades: "bg-orange-100 text-orange-700",
  Salário: "bg-green-100 text-green-700",
  Entretenimento: "bg-red-100 text-red-700",
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

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "all" || transaction.type === typeFilter;
    const matchesCategory =
      categoryFilter === "Todas" || transaction.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const totalResults = filteredTransactions.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalResults);
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transações</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie todas as suas transações financeiras
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova transação
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descrição"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Tipo
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="income">Entrada</SelectItem>
                  <SelectItem value="expense">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Categoria
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Período
              </label>
              <Select defaultValue="nov-2025">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nov-2025">Novembro / 2025</SelectItem>
                  <SelectItem value="oct-2025">Outubro / 2025</SelectItem>
                  <SelectItem value="sep-2025">Setembro / 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6 uppercase text-xs tracking-wide">
                  Descrição
                </TableHead>
                <TableHead className="uppercase text-xs tracking-wide">
                  Data
                </TableHead>
                <TableHead className="uppercase text-xs tracking-wide">
                  Categoria
                </TableHead>
                <TableHead className="uppercase text-xs tracking-wide">
                  Tipo
                </TableHead>
                <TableHead className="text-right uppercase text-xs tracking-wide">
                  Valor
                </TableHead>
                <TableHead className="pr-6 text-right uppercase text-xs tracking-wide">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction) => {
                const Icon = transaction.icon;
                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            iconBgColors[transaction.type]
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{transaction.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {transaction.date}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          categoryColors[transaction.category]
                        }`}
                      >
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.type === "income" ? (
                          <ArrowUpCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {transaction.type === "income" ? "Entrada" : "Saída"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
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
                    </TableCell>
                    <TableCell className="pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t px-6 py-4">
            <span className="text-sm text-muted-foreground">
              {startIndex + 1} a {endIndex} | {totalResults} resultados
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
