// Type Account
export interface Account {
  id: number;

  name: string;

  currentAmount: number;

  initalAmount: number;

  currentMonthYear: string;

  countCategories: number;
}

export interface InputAccount extends Omit<Account, "id"> {}

export interface AccountState extends Account{
  allocatedRemainingAmount: number;
}

// Type Income
export interface Income {
  id: number;

  description: string;

  monthYear: string;

  date: string;

  amount: number;

  recursive: number;

  accountId: number;
}

export interface InputIncome extends Omit<Income, "id"> {}

// Type Expense
export interface Expense {
  id: number;

  description: string;

  amount: number;

  monthYear: string;

  date: string;

  categoryId: number;

  accountId: number;
}

export interface InputExpense extends Omit<Expense, "id"> {}

export default Account;