import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShoppingItem as ShoppingItemType, RootStackParamList } from '../types';
import { ShoppingItem } from '../components/ShoppingItem';
import { loadShoppingList, updateItem, deleteItem, clearList, addItem } from '../utils/storage';
import {
  Container,
  Button,
  ButtonText,
  EmptyContainer,
  EmptyText,
  DeleteButton,
} from '../styles/global';
import styled from 'styled-components/native';

const EmptyStateContainer = styled(EmptyContainer)`
  padding: 32px;
`;

const EmptyStateIcon = styled.View`
  margin-bottom: 16px;
`;

const ButtonContainer = styled.View`
  padding: 16px;
`;

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
      await loadItems();
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
      'Limpar Lista Concluída',
      'Tem certeza que deseja limpar todos os itens concluídos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            await clearList(true);
            loadItems();
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
    <Container>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
      
      {items.length === 0 && (
        <EmptyStateContainer>
          <EmptyStateIcon>
            <MaterialCommunityIcons name="cart-check" size={64} color="#B3B3B3" />
          </EmptyStateIcon>
          <EmptyText>Nenhum item concluído</EmptyText>
          <EmptyText>Os itens marcados como concluídos aparecerão aqui</EmptyText>
        </EmptyStateContainer>
      )}
      
      {items.length > 0 && (
        <ButtonContainer>
          <DeleteButton onPress={handleClearList}>
            <ButtonText>Limpar Lista Concluída</ButtonText>
          </DeleteButton>
        </ButtonContainer>
      )}
    </Container>
  );
} 