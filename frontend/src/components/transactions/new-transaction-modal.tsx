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
          <div className="flex w-full rounded-lg border border-zinc-200 p-1">
            <button
              type="button"
              onClick={() => setType("expense")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md border py-2.5 text-sm font-medium transition-colors",
                type === "expense"
                  ? "border-red-500 bg-white text-zinc-900"
                  : "border-transparent text-zinc-500 hover:text-zinc-700"
              )}
            >
              <MinusCircle
                className={cn(
                  "h-4 w-4",
                  type === "expense" ? "text-red-500" : "text-zinc-400"
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
                  ? "border-green-500 bg-white text-zinc-900"
                  : "border-transparent text-zinc-500 hover:text-zinc-700"
              )}
            >
              <PlusCircle
                className={cn(
                  "h-4 w-4",
                  type === "income" ? "text-green-500" : "text-zinc-400"
                )}
              />
              Receita
            </button>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm text-zinc-700">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Ex. Almoço no restaurante"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={cn(
                "h-11 border-zinc-200",
                description ? "bg-white" : "bg-zinc-50"
              )}
            />
          </div>

          {/* Date and Amount Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date Field */}
            <div className="space-y-2">
              <Label className="text-sm text-zinc-700">Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-11 w-full justify-start border-zinc-200 font-normal",
                      date ? "bg-white" : "bg-zinc-50 text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-zinc-400" />
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
              <Label htmlFor="amount" className="text-sm text-zinc-700">
                Valor
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  R$
                </span>
                <Input
                  id="amount"
                  placeholder="0,00"
                  value={amount}
                  onChange={handleAmountChange}
                  className={cn(
                    "h-11 pl-9 border-zinc-200",
                    amount && amount !== "0,00" ? "bg-white" : "bg-zinc-50"
                  )}
                />
              </div>
            </div>
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <Label className="text-sm text-zinc-700">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                className={cn(
                  "h-11 border-zinc-200",
                  category ? "bg-white" : "bg-zinc-50"
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
                  <SelectItem value="" disabled>
                    Nenhuma categoria disponível
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-medium"
            disabled={!description || !date || !amount || !category}
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
