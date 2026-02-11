import { useState } from "react";
import { type LucideIcon } from "lucide-react";

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
import { iconOptions, colorOptions } from "@/lib/category-utils";

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

  // Get first 15 icons to display in the grid
  const displayIcons = iconOptions.slice(0, 15);

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
            <Label htmlFor="title" className="text-sm text-foreground">
              Título
            </Label>
            <Input
              id="title"
              placeholder="Ex. Alimentação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={cn(
                "h-11 border-border",
                title ? "bg-background" : "bg-secondary"
              )}
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm text-foreground">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Descrição da categoria"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={cn(
                "h-11 border-border",
                description ? "bg-background" : "bg-secondary"
              )}
            />
          </div>

          {/* Optional Section */}
          <div className="space-y-4">
            <span className="text-xs text-muted-foreground">Opcional</span>

            {/* Icon Selector */}
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Ícone</Label>
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
                          ? "border-success bg-green-50 text-success"
                          : "border-border bg-background text-muted-foreground hover:border-muted-foreground hover:bg-secondary"
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
              <Label className="text-sm text-foreground">Cor</Label>
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
            className="w-full h-12 font-medium"
            disabled={!title}
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
