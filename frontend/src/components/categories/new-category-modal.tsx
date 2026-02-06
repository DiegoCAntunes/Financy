import { useState } from "react";
import {
  Wallet,
  Car,
  PiggyBank,
  ShoppingCart,
  Building2,
  Calendar,
  Utensils,
  Accessibility,
  Home,
  Gift,
  Gamepad2,
  Smartphone,
  TreePine,
  Monitor,
  FileText,
  type LucideIcon,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface NewCategoryModalProps {
  children: React.ReactNode;
  onSubmit?: (data: CategoryFormData) => void;
}

export interface CategoryFormData {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const iconOptions: { id: string; icon: LucideIcon }[] = [
  { id: "wallet", icon: Wallet },
  { id: "car", icon: Car },
  { id: "piggy-bank", icon: PiggyBank },
  { id: "shopping-cart", icon: ShoppingCart },
  { id: "building", icon: Building2 },
  { id: "calendar", icon: Calendar },
  { id: "utensils", icon: Utensils },
  { id: "accessibility", icon: Accessibility },
  { id: "home", icon: Home },
  { id: "gift", icon: Gift },
  { id: "gamepad", icon: Gamepad2 },
  { id: "smartphone", icon: Smartphone },
  { id: "tree", icon: TreePine },
  { id: "monitor", icon: Monitor },
  { id: "file", icon: FileText },
];

const colorOptions = [
  { id: "green", bg: "bg-green-500", ring: "ring-green-500" },
  { id: "blue", bg: "bg-blue-500", ring: "ring-blue-500" },
  { id: "purple", bg: "bg-purple-500", ring: "ring-purple-500" },
  { id: "pink", bg: "bg-pink-500", ring: "ring-pink-500" },
  { id: "rose", bg: "bg-rose-500", ring: "ring-rose-500" },
  { id: "orange", bg: "bg-orange-500", ring: "ring-orange-500" },
  { id: "amber", bg: "bg-amber-500", ring: "ring-amber-500" },
];

export function NewCategoryModal({
  children,
  onSubmit,
}: NewCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("wallet");
  const [selectedColor, setSelectedColor] = useState("green");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: CategoryFormData = {
      title,
      description,
      icon: selectedIcon,
      color: selectedColor,
    };

    onSubmit?.(formData);
    handleReset();
    setOpen(false);
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setSelectedIcon("wallet");
    setSelectedColor("green");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Nova categoria
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm text-zinc-700">
              Título
            </Label>
            <Input
              id="title"
              placeholder="Ex. Alimentação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={cn(
                "h-11 border-zinc-200",
                title ? "bg-white" : "bg-zinc-50"
              )}
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm text-zinc-700">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Descrição da categoria"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={cn(
                "h-11 border-zinc-200",
                description ? "bg-white" : "bg-zinc-50"
              )}
            />
          </div>

          {/* Optional Section */}
          <div className="space-y-4">
            <span className="text-xs text-muted-foreground">Opcional</span>

            {/* Icon Selector */}
            <div className="space-y-2">
              <Label className="text-sm text-zinc-700">Ícone</Label>
              <div className="grid grid-cols-8 gap-2">
                {iconOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedIcon === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedIcon(option.id)}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg border transition-all",
                        isSelected
                          ? "border-green-500 bg-green-50 text-green-600"
                          : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <Label className="text-sm text-zinc-700">Cor</Label>
              <div className="flex gap-2">
                {colorOptions.map((color) => {
                  const isSelected = selectedColor === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color.id)}
                      className={cn(
                        "h-8 w-10 rounded-md transition-all",
                        color.bg,
                        isSelected && "ring-2 ring-offset-2",
                        isSelected && color.ring
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-medium"
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
