import { supabase } from '../config/supabase';
import { Note } from '../types';

const TABLE_NAME = 'notes';

export const noteService = {
  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        title: note.title,
        content: note.content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  },

  async getNotes(): Promise<Note[]> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(note => ({
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: new Date(note.created_at),
      updatedAt: new Date(note.updated_at),
    }));
  },

  async updateNote(note: Note): Promise<Note> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        title: note.title,
        content: note.content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', note.id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  },

  async deleteNote(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
}; 