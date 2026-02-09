import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Tags,
  ArrowUpDown,
  Trash2,
  Pencil,
  Loader2,
} from "lucide-react";
import {
  NewCategoryModal,
  type CategoryFormData,
} from "@/components/categories/new-category-modal";
import {
  useMyCategoriesQuery,
  useMyTransactionsQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  MyCategoriesDocument,
  MyTransactionsDocument,
} from "@/graphql/generated";
import { getIconComponent, getColorClasses } from "@/lib/category-utils";

export default function CategoriesPage() {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useMyCategoriesQuery();

  const { data: transactionsData, loading: transactionsLoading } =
    useMyTransactionsQuery();

  const [createCategory] = useCreateCategoryMutation({
    refetchQueries: [{ query: MyCategoriesDocument }],
  });

  const [deleteCategory] = useDeleteCategoryMutation({
    refetchQueries: [
      { query: MyCategoriesDocument },
      { query: MyTransactionsDocument },
    ],
  });

  const categories = categoriesData?.myCategories ?? [];
  const transactions = transactionsData?.myTransactions ?? [];

  // Calculate summary data
  const totalCategories = categories.length;
  const totalTransactions = transactions.length;

  // Find most used category
  const categoryUsage = categories.map((cat) => ({
    ...cat,
    count: transactions.filter((t) => t.category.id === cat.id).length,
  }));
  const mostUsedCategory = categoryUsage.sort((a, b) => b.count - a.count)[0];

  // Map categories with transaction counts
  const categoriesWithCount = categories.map((cat) => {
    const count = transactions.filter((t) => t.category.id === cat.id).length;
    const colorClasses = getColorClasses(cat.color);
    return {
      id: cat.id,
      name: cat.title,
      description: cat.description || "",
      itemCount: count,
      icon: cat.icon,
      iconBg: colorClasses.bg,
      iconColor: colorClasses.text,
      badgeColor: colorClasses.badge,
    };
  });

  const handleCreateCategory = async (data: CategoryFormData) => {
    await createCategory({
      variables: {
        data: {
          title: data.title,
          description: data.description || undefined,
          icon: data.icon,
          color: data.color,
        },
      },
    });
  };

  const handleDeleteCategory = async (id: string) => {
    const categoryTransactions = transactions.filter(
      (t) => t.category.id === id
    );
    if (categoryTransactions.length > 0) {
      alert(
        `Esta categoria possui ${categoryTransactions.length} transação(ões) associada(s). Remova as transações primeiro.`
      );
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      await deleteCategory({
        variables: { id },
      });
    }
  };

  if (categoriesLoading || transactionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">
          Erro ao carregar dados: {categoriesError.message}
        </p>
      </div>
    );
  }

  const MostUsedIcon = mostUsedCategory
    ? getIconComponent(mostUsedCategory.icon)
    : Tags;
  const mostUsedColorClasses = mostUsedCategory
    ? getColorClasses(mostUsedCategory.color)
    : { bg: "bg-zinc-100", text: "text-zinc-600" };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categorias</h1>
          <p className="text-sm text-muted-foreground">
            Organize suas transações por categorias
          </p>
        </div>
        <NewCategoryModal onSubmit={handleCreateCategory}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova categoria
          </Button>
        </NewCategoryModal>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100">
              <Tags className="h-6 w-6 text-zinc-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">
                {totalCategories}
              </p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Total de Categorias
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100">
              <ArrowUpDown className="h-6 w-6 text-zinc-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">
                {totalTransactions}
              </p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Total de Transações
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg ${mostUsedColorClasses.bg}`}
            >
              <MostUsedIcon className={`h-6 w-6 ${mostUsedColorClasses.text}`} />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">
                {mostUsedCategory?.title || "-"}
              </p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Categoria Mais Utilizada
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      {categoriesWithCount.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <Tags className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhuma categoria encontrada
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Crie sua primeira categoria para organizar suas transações
            </p>
            <NewCategoryModal onSubmit={handleCreateCategory}>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova categoria
              </Button>
            </NewCategoryModal>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categoriesWithCount.map((category) => {
            const Icon = getIconComponent(category.icon);
            return (
              <Card key={category.id} className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.iconBg}`}
                    >
                      <Icon className={`h-5 w-5 ${category.iconColor}`} />
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-red-600"
                        onClick={() => handleDeleteCategory(category.id)}
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
                  </div>

                  <h3 className="font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {category.description || "Sem descrição"}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={`rounded-full border-0 ${category.badgeColor}`}
                    >
                      {category.name}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {category.itemCount}{" "}
                      {category.itemCount === 1 ? "item" : "itens"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
