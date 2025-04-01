import React, { useState } from 'react';
import { FlatList, Alert, StatusBar, Platform } from 'react-native';
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

const HeaderContainer = styled.View`
  padding: 16px 20px;
  background-color: #2C3E50;
  border-bottom-width: 1px;
  border-bottom-color: #34495E;
`;

const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #FFC107;
  margin-bottom: 4px;
`;

const HeaderInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderSubtitle = styled.Text`
  font-size: 14px;
  color: #7F8C8D;
`;

const TotalValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #FFC107;
`;

const ListContent = styled.View`
  flex: 1;
  padding: 16px;
`;

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

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

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
      <HeaderContainer>
        <HeaderTitle>Lista de compras</HeaderTitle>
        <HeaderInfo>
          <HeaderSubtitle>
            {items.length} {items.length === 1 ? 'item pendente' : 'itens pendentes'}
          </HeaderSubtitle>
          <TotalValue>{formatPrice(calculateTotal())}</TotalValue>
        </HeaderInfo>
      </HeaderContainer>

      <ListContent>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
        
        {items.length === 0 && (
          <EmptyStateContainer>
            <EmptyStateIcon>
              <MaterialCommunityIcons name="cart-outline" size={64} color="#B3B3B3" />
            </EmptyStateIcon>
            <EmptyText>Sua lista está vazia</EmptyText>
            <EmptyText>Adicione itens para começar</EmptyText>
          </EmptyStateContainer>
        )}
      </ListContent>
      
      <ButtonContainer>
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
      </ButtonContainer>
    </Container>
  );
} 