import { useState, useEffect } from "react";
import { type LucideIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { iconOptions, colorOptions } from "@/lib/category-utils";

interface Category {
  id: string;
  title: string;
  description?: string | null;
  icon: string;
  color: string;
}

interface EditCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onSubmit?: (id: string, data: CategoryFormData) => void;
}

export interface CategoryFormData {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export function EditCategoryModal({
  open,
  onOpenChange,
  category,
  onSubmit,
}: EditCategoryModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("wallet");
  const [selectedColor, setSelectedColor] = useState("green");

  useEffect(() => {
    if (category && open) {
      setTitle(category.title);
      setDescription(category.description || "");
      setSelectedIcon(category.icon);
      setSelectedColor(category.color);
    }
  }, [category, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) return;

    const formData: CategoryFormData = {
      title,
      description,
      icon: selectedIcon,
      color: selectedColor,
    };

    onSubmit?.(category.id, formData);
    onOpenChange(false);
  };

  // Get first 15 icons to display in the grid
  const displayIcons = iconOptions.slice(0, 15);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Editar categoria
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Altere os dados da categoria
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-sm text-zinc-700">
              Título
            </Label>
            <Input
              id="edit-title"
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
            <Label htmlFor="edit-description" className="text-sm text-zinc-700">
              Descrição
            </Label>
            <Input
              id="edit-description"
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
                {displayIcons.map((option) => {
                  const Icon = option.icon as LucideIcon;
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
            disabled={!title}
          >
            Salvar alterações
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
