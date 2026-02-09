import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
import { NewTransactionModal } from "@/components/transactions/new-transaction-modal";
import {
  useMyTransactionsQuery,
  useMyCategoriesQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  TransactionType,
  MyTransactionsDocument,
} from "@/graphql/generated";
import {
  Plus,
  Search,
  ArrowUpCircle,
  ArrowDownCircle,
  Trash2,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getIconComponent, getColorClasses } from "@/lib/category-utils";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(dateString: string): string {
  return format(new Date(dateString), "dd/MM/yy", { locale: ptBR });
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
  } = useMyTransactionsQuery();

  const { data: categoriesData, loading: categoriesLoading } =
    useMyCategoriesQuery();

  const [createTransaction] = useCreateTransactionMutation({
    refetchQueries: [{ query: MyTransactionsDocument }],
  });

  const [deleteTransaction] = useDeleteTransactionMutation({
    refetchQueries: [{ query: MyTransactionsDocument }],
  });

  const transactions = transactionsData?.myTransactions ?? [];
  const categories = categoriesData?.myCategories ?? [];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "income" && transaction.type === "INCOME") ||
      (typeFilter === "expense" && transaction.type === "EXPENSE");
    const matchesCategory =
      categoryFilter === "all" || transaction.category.id === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  // Sort by date descending
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalResults = sortedTransactions.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalResults);
  const paginatedTransactions = sortedTransactions.slice(startIndex, endIndex);

  const handleCreateTransaction = async (data: {
    type: "expense" | "income";
    description: string;
    date: Date | undefined;
    amount: string;
    category: string;
  }) => {
    if (!data.date || !data.category) return;

    const numericAmount = parseFloat(
      data.amount.replace(/\./g, "").replace(",", ".")
    );

    await createTransaction({
      variables: {
        data: {
          description: data.description,
          amount: numericAmount,
          date: data.date.toISOString(),
          type:
            data.type === "income"
              ? TransactionType.Income
              : TransactionType.Expense,
          categoryId: data.category,
        },
      },
    });
  };

  const handleDeleteTransaction = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      await deleteTransaction({
        variables: { id },
      });
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
        <p className="text-red-500">
          Erro ao carregar dados: {transactionsError.message}
        </p>
      </div>
    );
  }

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
        <NewTransactionModal
          onSubmit={handleCreateTransaction}
          categories={categories}
        >
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova transação
          </Button>
        </NewTransactionModal>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Buscar</Label>
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
              <Label className="text-muted-foreground">Tipo</Label>
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
              <Label className="text-muted-foreground">Categoria</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Período</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="current-month">Este mês</SelectItem>
                  <SelectItem value="last-month">Mês passado</SelectItem>
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
              {paginatedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-muted-foreground">
                      Nenhuma transação encontrada
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTransactions.map((transaction) => {
                  const Icon = getIconComponent(transaction.category.icon);
                  const type =
                    transaction.type === "INCOME" ? "income" : "expense";
                  const colorClasses = getColorClasses(
                    transaction.category.color
                  );

                  return (
                    <TableRow key={transaction.id}>
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                              type === "income"
                                ? "bg-green-50 text-green-600"
                                : "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="font-medium">
                            {transaction.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(transaction.date)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`rounded-full border-0 ${colorClasses.badge}`}
                        >
                          {transaction.category.title}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {type === "income" ? (
                            <ArrowUpCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm text-muted-foreground">
                            {type === "income" ? "Entrada" : "Saída"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`font-semibold ${
                            type === "income" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {type === "income" ? "+ " : "- "}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </TableCell>
                      <TableCell className="pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-600"
                            onClick={() =>
                              handleDeleteTransaction(transaction.id)
                            }
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
                })
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalResults > 0 && (
            <>
              <Separator />
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-muted-foreground">
                  {startIndex + 1} a {endIndex} | {totalResults} resultados
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from(
                    { length: Math.min(totalPages, 3) },
                    (_, i) => i + 1
                  ).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
