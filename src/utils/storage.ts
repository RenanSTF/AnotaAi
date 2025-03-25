import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList, ShoppingItem } from '../types';

const STORAGE_KEY = '@anotaai:shopping_list';

const serializeItem = (item: ShoppingItem): ShoppingItem => ({
  ...item,
  createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
  updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt,
});

const deserializeItem = (item: ShoppingItem): ShoppingItem => ({
  ...item,
  createdAt: new Date(item.createdAt),
  updatedAt: new Date(item.updatedAt),
});

export const saveShoppingList = async (list: ShoppingList): Promise<void> => {
  try {
    const serializedList = {
      items: list.items.map(serializeItem),
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(serializedList));
  } catch (error) {
    console.error('Erro ao salvar lista:', error);
  }
};

export const loadShoppingList = async (): Promise<ShoppingList> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      return {
        items: parsedData.items.map(deserializeItem),
      };
    }
    return { items: [] };
  } catch (error) {
    console.error('Erro ao carregar lista:', error);
    return { items: [] };
  }
};

export const addItem = async (item: ShoppingItem): Promise<void> => {
  try {
    const list = await loadShoppingList();
    list.items.push(serializeItem(item));
    await saveShoppingList(list);
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
  }
};

export const updateItem = async (updatedItem: ShoppingItem): Promise<void> => {
  try {
    const list = await loadShoppingList();
    const index = list.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      list.items[index] = serializeItem(updatedItem);
      await saveShoppingList(list);
    }
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
  }
};

export const deleteItem = async (itemId: string): Promise<void> => {
  try {
    const list = await loadShoppingList();
    list.items = list.items.filter(item => item.id !== itemId);
    await saveShoppingList(list);
  } catch (error) {
    console.error('Erro ao deletar item:', error);
  }
};

export const clearList = async (clearCompleted: boolean = false): Promise<void> => {
  try {
    const list = await loadShoppingList();
    list.items = list.items.filter(item => item.completed !== clearCompleted);
    await saveShoppingList(list);
  } catch (error) {
    console.error('Erro ao limpar lista:', error);
  }
}; 