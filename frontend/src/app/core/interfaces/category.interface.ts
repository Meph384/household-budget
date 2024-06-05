export interface Category {
  categoryId: number;
  title: string;
  icon?: string;
  type?: string;
}

export interface CategorySpending {
  category: Category,
  totalAmount: number
}

export interface GroupedData {
  [key: string]: {
    [key: string]: number;
  }
}
