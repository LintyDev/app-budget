export interface Log {
  id: number;

  type: 'add_account'| 'remove_account' | 'transaction_income' | 'transaction_expense' | 'add_category';

  description: string;

  date: string;

  amount: number | null;

  transaction_type: string | null;

  remainingAmount: number | null;

  categoryId: number | null;
}

export interface InputLog extends Omit<Log, "id"> {}