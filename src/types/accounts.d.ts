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

  amount: number;

  recursive: number;

  accountId: number;
}

export interface InputIncome extends Omit<Income, "id"> {}

export default Account;