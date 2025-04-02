import React, { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShoppingItem as ShoppingItemType, RootStackParamList } from '../types';
import { ShoppingItem } from '../components/ShoppingItem';
import { loadShoppingList, updateItem, deleteItem, clearCartList, addItem } from '../utils/storage';
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

export default function CartScreen() {
  const [items, setItems] = useState<ShoppingItemType[]>([]);
  const navigation = useNavigation<NavigationProp>();

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
      await loadItems();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o item');
    }
  };

  const handleDeleteItem = async (item: ShoppingItemType) => {
    await deleteItem(item.id);
    loadItems();
  };

  const handleClearCart = () => {
    Alert.alert(
      'Esvaziar Cesta',
      'Tem certeza que deseja remover todos os itens do Cesta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Esvaziar',
          style: 'destructive',
          onPress: async () => {
            await clearCartList();
            loadItems();
            Alert.alert('Sucesso', 'Cesta esvaziado com sucesso!');
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: ShoppingItemType }) => (
    <ShoppingItem
      item={item}
      onPress={() => navigation.navigate('ItemDetails', { item, onItemSaved: loadItems })}
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
          <EmptyText>O Cesta está vazio</EmptyText>
        </EmptyContainer>
      )}
      {items.length > 0 && (
        <DeleteButton onPress={handleClearCart}>
          <ButtonText>Esvaziar Cesta</ButtonText>
        </DeleteButton>
      )}
    </Container>
  );
}
