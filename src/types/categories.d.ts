import { Expense } from "./accounts";

export interface Category {
  id: number;

  name: string;

  color: string;

  amountAllocated: number;

  currentAmount: number;

  accountId: number;
}

export interface InputCategory extends Omit<Category, "id"> {}

export interface CategoryWithExpenses extends Category {
  expenses: null | Expense[]
}

export default Category;