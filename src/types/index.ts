export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  completed: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ShoppingList {
  items: ShoppingItem[];
}

export type RootStackParamList = {
  Home: undefined;
  ItemDetails: { 
    item?: ShoppingItem;
    onItemSaved?: () => void;
  };
};