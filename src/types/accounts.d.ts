export interface Account {
  id: number;

  name: string;

  currentAmount: number;

  initalAmount: number;

  currentMonthYear: number;

  countCategories: number;
}

export interface InputAccount extends Omit<Account, "id"> {}

export interface AccountState {
  id?: number;

  name?: string;

  currentAmount?: number;

  initalAmount?: number;

  currentMonthYear?: number;

  countCategories?: number;
}

export default Account;