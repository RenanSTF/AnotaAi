import { createClient } from '@supabase/supabase-js';
import { ShoppingList, ShoppingItem } from '../types';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_KEY as string;

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

export const clearList = async (clearCompleted: boolean): Promise<void> => {
  console.log("passou")
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


