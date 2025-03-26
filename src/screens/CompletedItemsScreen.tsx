import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShoppingItem as ShoppingItemType, RootStackParamList } from '../types';
import { ShoppingItem } from '../components/ShoppingItem';
import { loadShoppingList, updateItem, deleteItem, clearList, addItem } from '../utils/storage';

export default function CompletedItemsScreen() {
  const [items, setItems] = useState<ShoppingItemType[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const loadItems = async () => {
    const list = await loadShoppingList();
    setItems(list.items.filter(item => item.completed));
  };

  useFocusEffect(
    React.useCallback(() => {
      loadItems();
    }, [])
  );

  const handleToggleComplete = async (item: ShoppingItemType) => {
    try {
      const updatedItem = { 
        ...item, 
        completed: !item.completed,
        updatedAt: new Date()
      };
      await updateItem(updatedItem);
      await loadItems(); // Recarrega a lista após atualizar
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o item');
    }
  };

  const handleDeleteItem = async (item: ShoppingItemType) => {
    await deleteItem(item.id);
    loadItems();
  };

  const handlePressItem = (item: ShoppingItemType) => {
    navigation.navigate('ItemDetails', { 
      item,
      onItemSaved: loadItems
    });
  };

  const handleClearList = () => {
    console.log('Tentando limpar lista...');
    Alert.alert(
      'Limpar Lista Concluída',
      'Tem certeza que deseja limpar todos os itens concluídos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            await clearList(true);
            await loadItems();
            Alert.alert('Sucesso', 'Lista de itens concluídos limpa com sucesso!');
          },
        },
      ]
    );
  };
  
  

  const renderItem = ({ item }: { item: ShoppingItemType }) => (
    <ShoppingItem
      item={item}
      onPress={handlePressItem}
      onToggleComplete={handleToggleComplete}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      {items.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum item concluído</Text>
        </View>
      )}
      {items.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleClearList}>
          <Text style={styles.deleteButtonText}>Limpar Lista Concluída</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  list: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 