import { createClient } from '@supabase/supabase-js';
import { ShoppingList, ShoppingItem } from '../types';

const supabaseUrl = 'https://lsutyjmahtfxqmjfqkpp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzdXR5am1haHRmeHFtamZxa3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NTM0NzgsImV4cCI6MjA1ODUyOTQ3OH0.ezQeuMsSEqvvERFEWMcnokmuWb5A1xND5OmPBNlB3Bk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TABLE_NAME = 'shopping_list';

// Ajuste os nomes das propriedades para letras minúsculas
const serializeItem = (item: ShoppingItem): ShoppingItem => ({
  ...item,
  createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
  updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt,
});

const deserializeItem = (item: any): ShoppingItem => ({
  ...item,
  createdAt: new Date(item.createdat),
  updatedAt: new Date(item.updatedat),
});

export const saveShoppingList = async (list: ShoppingList): Promise<void> => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert(
        list.items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          completed: item.completed,
          price: item.price,
          createdat: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
          updatedat: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt,
        })),
        { onConflict: 'id' }
      );

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erro ao salvar lista:', error);
  }
};


export const loadShoppingList = async (): Promise<ShoppingList> => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*');

    if (error) {
      throw error;
    }

    return {
      items: data ? data.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        completed: item.completed,
        createdAt: new Date(item.createdat),
        updatedAt: new Date(item.updatedat),
        price: item.price,
      })) : [],
    };
  } catch (error) {
    console.error('Erro ao carregar lista:', error);
    return { items: [] };
  }
};

export const addItem = async (item: ShoppingItem): Promise<void> => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .insert({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        completed: item.completed,
        price: item.price,
        createdat: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
        updatedat: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt,
      });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
  }
};

export const updateItem = async (updatedItem: ShoppingItem): Promise<void> => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .update({
        id: updatedItem.id,
        name: updatedItem.name,
        quantity: updatedItem.quantity,
        completed: updatedItem.completed,
        price: updatedItem.price,
        createdat: updatedItem.createdAt instanceof Date ? updatedItem.createdAt.toISOString() : updatedItem.createdAt,
        updatedat: updatedItem.updatedAt instanceof Date ? updatedItem.updatedAt.toISOString() : updatedItem.updatedAt,
      })
      .eq('id', updatedItem.id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
  }
};

export const deleteItem = async (itemId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', itemId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erro ao deletar item:', error);
  }
};

export const clearList = async (clearCompleted: boolean = false): Promise<void> => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('completed', clearCompleted);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erro ao limpar lista:', error);
  }
};
