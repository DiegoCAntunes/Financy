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

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "INCOME" | "EXPENSE";
  category: {
    id: string;
    title: string;
  };
}

interface EditTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  onSubmit?: (id: string, data: TransactionFormData) => void;
  categories?: Category[];
}

export interface TransactionFormData {
  type: "expense" | "income";
  description: string;
  date: Date | undefined;
  amount: string;
  category: string;
}

interface EditTransactionFormProps {
  transaction: Transaction;
  onSubmit?: (id: string, data: TransactionFormData) => void;
  onClose: () => void;
  categories: Category[];
}

function EditTransactionForm({
  transaction,
  onSubmit,
  onClose,
  categories,
}: EditTransactionFormProps) {
  const [type, setType] = useState<"expense" | "income">(
    transaction.type === "INCOME" ? "income" : "expense"
  );
  const [description, setDescription] = useState(transaction.description);
  const [date, setDate] = useState<Date | undefined>(
    new Date(transaction.date)
  );
  const [amount, setAmount] = useState(
    transaction.amount.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
  const [category, setCategory] = useState(transaction.category.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: TransactionFormData = {
      type,
      description,
      date,
      amount,
      category,
    };

    onSubmit?.(transaction.id, formData);
    onClose();
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
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          Editar transacao
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Altere os dados da transacao
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
          <Label htmlFor="edit-description" className="text-sm text-zinc-700">
            Descricao
          </Label>
          <Input
            id="edit-description"
            placeholder="Ex. Almoco no restaurante"
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
            <Label htmlFor="edit-amount" className="text-sm text-zinc-700">
              Valor
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                R$
              </span>
              <Input
                id="edit-amount"
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
                <div className="py-2 px-2 text-sm text-muted-foreground text-center">
                  Nenhuma categoria disponivel
                </div>
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
          Salvar alteracoes
        </Button>
      </form>
    </>
  );
}

export function EditTransactionModal({
  open,
  onOpenChange,
  transaction,
  onSubmit,
  categories = [],
}: EditTransactionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {transaction && (
          <EditTransactionForm
            key={transaction.id}
            transaction={transaction}
            onSubmit={onSubmit}
            onClose={() => onOpenChange(false)}
            categories={categories}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
