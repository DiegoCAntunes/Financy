import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, MinusCircle, PlusCircle } from "lucide-react";

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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
}

interface NewTransactionModalProps {
  children: React.ReactNode;
  onSubmit?: (data: TransactionFormData) => void;
  categories?: Category[];
}

export interface TransactionFormData {
  type: "expense" | "income";
  description: string;
  date: Date | undefined;
  amount: string;
  category: string;
}

export function NewTransactionModal({
  children,
  onSubmit,
  categories = [],
}: NewTransactionModalProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: TransactionFormData = {
      type,
      description,
      date,
      amount,
      category,
    };

    onSubmit?.(formData);
    handleReset();
    setOpen(false);
  };

  const handleReset = () => {
    setType("expense");
    setDescription("");
    setDate(undefined);
    setAmount("");
    setCategory("");
  };

  const formatCurrencyInput = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const numberValue = parseInt(numericValue || "0", 10) / 100;
    return numberValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setAmount(formatted);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Nova transação
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Registre sua despesa ou receita
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Transaction Type Toggle */}
          <div className="flex w-full rounded-lg border border-border p-1">
            <button
              type="button"
              onClick={() => setType("expense")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md border py-2.5 text-sm font-medium transition-colors",
                type === "expense"
                  ? "border-destructive bg-background text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <MinusCircle
                className={cn(
                  "h-4 w-4",
                  type === "expense" ? "text-destructive" : "text-muted-foreground"
                )}
              />
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md border py-2.5 text-sm font-medium transition-colors",
                type === "income"
                  ? "border-success bg-background text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <PlusCircle
                className={cn(
                  "h-4 w-4",
                  type === "income" ? "text-success" : "text-muted-foreground"
                )}
              />
              Receita
            </button>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm text-foreground">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Ex. Almoço no restaurante"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={cn(
                "h-11 border-border",
                description ? "bg-background" : "bg-secondary"
              )}
            />
          </div>

          {/* Date and Amount Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date Field */}
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-11 w-full justify-start border-border font-normal",
                      date ? "bg-background" : "bg-secondary text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {date ? (
                      format(date, "dd/MM/yy", { locale: ptBR })
                    ) : (
                      <span>Selecione</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={ptBR}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Amount Field */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm text-foreground">
                Valor
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  R$
                </span>
                <Input
                  id="amount"
                  placeholder="0,00"
                  value={amount}
                  onChange={handleAmountChange}
                  className={cn(
                    "h-11 pl-9 border-border",
                    amount && amount !== "0,00" ? "bg-background" : "bg-secondary"
                  )}
                />
              </div>
            </div>
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <Label className="text-sm text-foreground">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                className={cn(
                  "h-11 border-border",
                  category ? "bg-background" : "bg-secondary"
                )}
              >
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.title}
                    </SelectItem>
                  ))
                ) : (
                  <div className="py-2 px-2 text-sm text-muted-foreground text-center">
                    Nenhuma categoria disponível
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 font-medium"
            disabled={!description || !date || !amount || !category}
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
