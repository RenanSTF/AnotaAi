import React, { useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShoppingItem as ShoppingItemType, RootStackParamList } from '../types';
import { ShoppingItem } from '../components/ShoppingItem';
import { loadShoppingList, updateItem, deleteItem, clearList, addItem } from '../utils/storage';
import {
  Container,
  ListContainer,
  Button,
  ButtonText,
  EmptyContainer,
  EmptyText,
  DeleteButton,
} from '../styles/global';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function PendingItemsScreen() {
  const [items, setItems] = useState<ShoppingItemType[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const loadItems = async () => {
    const list = await loadShoppingList();
    setItems(list.items.filter(item => !item.completed));
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
    Alert.alert(
      'Limpar Lista Pendente',
      'Tem certeza que deseja limpar todos os itens pendentes?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            await clearList(false);
            loadItems();
            Alert.alert('Sucesso', 'Lista de itens pendentes limpa com sucesso!');
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
    <Container>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 8 }}
      />
      {items.length === 0 && (
        <EmptyContainer>
          <EmptyText>Nenhum item pendente</EmptyText>
        </EmptyContainer>
      )}
      <Button onPress={() => navigation.navigate('ItemDetails', { 
        onItemSaved: loadItems 
      })}>
        <ButtonText>+ Adicionar Item</ButtonText>
      </Button>
      {items.length > 0 && (
        <DeleteButton onPress={handleClearList}>
          <ButtonText>Limpar Lista Pendente</ButtonText>
        </DeleteButton>
      )}
    </Container>
  );
} 