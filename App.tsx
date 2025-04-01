import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { noteService } from './src/services/noteService';
import { Note } from './src/types';

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await noteService.getNotes();
      setNotes(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as notas');
    }
  };

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const newNote = await noteService.createNote({ title, content });
      setNotes([newNote, ...notes]);
      setTitle('');
      setContent('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a nota');
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await noteService.deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar a nota');
    }
  };

  const renderNote = ({ item }: { item: Note }) => (
    <View style={styles.noteCard}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent}>{item.content}</Text>
      <Text style={styles.noteDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNote(item.id)}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Notas</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.contentInput]}
          placeholder="Conteúdo"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
          <Text style={styles.addButtonText}>Adicionar Nota</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  noteDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
