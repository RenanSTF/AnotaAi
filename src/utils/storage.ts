import { createClient } from '@supabase/supabase-js';
import { ShoppingList, ShoppingItem } from '../types';

const supabaseUrl = 'https://lsutyjmahtfxqmjfqkpp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzdXR5am1haHRmeHFtamZxa3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NTM0NzgsImV4cCI6MjA1ODUyOTQ3OH0.ezQeuMsSEqvvERFEWMcnokmuWb5A1xND5OmPBNlB3Bk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TABLE_NAME = 'shopping_list';

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
        updatedAt: new Date(item.updatedat),  // Mantém updatedAt do Supabase
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

export const clearCartList = async (): Promise<void> => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('completed', true); // Remove apenas os itens completos

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erro ao limpar lista de itens completos:', error);
  }
};

export const clearPendingList = async (): Promise<void> => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('completed', false); // Remove apenas os itens pendentes

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erro ao limpar lista de itens pendentes:', error);
  }
};

