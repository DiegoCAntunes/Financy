import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Tags,
  ArrowUpDown,
  Utensils,
  Film,
  TrendingUp,
  ShoppingCart,
  Briefcase,
  Heart,
  Car,
  Zap,
  Trash2,
  Pencil,
} from "lucide-react";
import { NewCategoryModal, type CategoryFormData } from "@/components/categories/new-category-modal";

// Mock data
const summaryData = {
  totalCategories: 8,
  totalTransactions: 27,
  mostUsedCategory: {
    name: "Alimentação",
    icon: Utensils,
  },
};

const mockCategories = [
  {
    id: "1",
    name: "Alimentação",
    description: "Restaurantes, delivery e refeições",
    itemCount: 12,
    icon: Utensils,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badgeColor: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  {
    id: "2",
    name: "Entretenimento",
    description: "Cinema, jogos e lazer",
    itemCount: 2,
    icon: Film,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    badgeColor: "bg-red-100 text-red-700 hover:bg-red-100",
  },
  {
    id: "3",
    name: "Investimento",
    description: "Aplicações e retornos financeiros",
    itemCount: 1,
    icon: TrendingUp,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    badgeColor: "bg-teal-100 text-teal-700 hover:bg-teal-100",
  },
  {
    id: "4",
    name: "Mercado",
    description: "Compras de supermercado e mantimentos",
    itemCount: 3,
    icon: ShoppingCart,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  },
  {
    id: "5",
    name: "Salário",
    description: "Renda mensal e bonificações",
    itemCount: 3,
    icon: Briefcase,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badgeColor: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  {
    id: "6",
    name: "Saúde",
    description: "Medicamentos, consultas e exames",
    itemCount: 0,
    icon: Heart,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    badgeColor: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  },
  {
    id: "7",
    name: "Transporte",
    description: "Gasolina, transporte público e viagens",
    itemCount: 8,
    icon: Car,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  {
    id: "8",
    name: "Utilidades",
    description: "Energia, água, internet e telefone",
    itemCount: 7,
    icon: Zap,
    iconBg: "bg-lime-100",
    iconColor: "text-lime-600",
    badgeColor: "bg-lime-100 text-lime-700 hover:bg-lime-100",
  },
];

export default function CategoriesPage() {
  const MostUsedIcon = summaryData.mostUsedCategory.icon;

  const handleCreateCategory = (data: CategoryFormData) => {
    console.log("Nova categoria:", data);
    // TODO: Implement API call to create category
  };

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
                {summaryData.totalCategories}
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
                {summaryData.totalTransactions}
              </p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Total de Transações
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <MostUsedIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">
                {summaryData.mostUsedCategory.name}
              </p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Categoria Mais Utilizada
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockCategories.map((category) => {
          const Icon = category.icon;
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
                  {category.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className={`rounded-full border-0 ${category.badgeColor}`}
                  >
                    {category.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {category.itemCount} {category.itemCount === 1 ? "item" : "itens"}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
