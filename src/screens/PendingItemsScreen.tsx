import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShoppingItem as ShoppingItemType } from '../types';
import { ShoppingItem } from '../components/ShoppingItem';
import { loadShoppingList, updateItem, deleteItem } from '../utils/storage';
import {
  Container,
  ListContainer,
  Button,
  ButtonText,
  EmptyContainer,
  EmptyText,
} from '../styles/global';

export default function PendingItemsScreen() {
  const [items, setItems] = useState<ShoppingItemType[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const list = await loadShoppingList();
    setItems(list.items.filter(item => !item.completed));
  };

  const handleToggleComplete = async (item: ShoppingItemType) => {
    const updatedItem = { ...item, completed: !item.completed };
    await updateItem(updatedItem);
    loadItems();
  };

  const handleDeleteItem = async (item: ShoppingItemType) => {
    await deleteItem(item.id);
    loadItems();
  };

  const handlePressItem = (item: ShoppingItemType) => {
    navigation.navigate('ItemDetails', { item });
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
        contentContainerStyle={ListContainer}
      />
      {items.length === 0 && (
        <EmptyContainer>
          <EmptyText>Nenhum item pendente</EmptyText>
        </EmptyContainer>
      )}
      <Button onPress={() => navigation.navigate('ItemDetails')}>
        <ButtonText>+ Adicionar Item</ButtonText>
      </Button>
    </Container>
  );
} 