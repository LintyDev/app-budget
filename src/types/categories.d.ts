export interface Category {
  id: number;

  name: string;

  color: string;

  amountAllocated: number | null;

  currentAmount: number;

  accountId: number;
}

export interface InputCategory extends Omit<Category, "id"> {}

export default Category;