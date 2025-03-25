import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ShoppingItem as ShoppingItemType } from '../types';
import { addItem, updateItem, deleteItem } from '../utils/storage';
import {
  Container,
  Card,
  Label,
  Input,
  Button,
  ButtonText,
  DeleteButton,
} from '../styles/global';

export default function ItemDetailsScreen() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('0');
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const item = route.params?.item as ShoppingItemType | undefined;
  const onItemSaved = route.params?.onItemSaved;

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity.toString());
      setPrice(item.price.toString());
    }
  }, [item]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'O nome do item é obrigatório');
      return;
    }

    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum) || quantityNum < 1) {
      Alert.alert('Erro', 'A quantidade deve ser um número maior que zero');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      Alert.alert('Erro', 'O preço deve ser um número não negativo');
      return;
    }

    const newItem: ShoppingItemType = {
      id: item?.id || Date.now().toString(),
      name: name.trim(),
      quantity: quantityNum,
      price: priceNum,
      completed: item?.completed || false,
      createdAt: item?.createdAt ? new Date(item.createdAt) : new Date(),
      updatedAt: new Date(),
    };

    if (item) {
      await updateItem(newItem);
    } else {
      await addItem(newItem);
    }

    if (onItemSaved) {
      onItemSaved();
    }

    navigation.goBack();
  };

  const handleDelete = async () => {
    if (!item) return;

    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteItem(item.id);
            if (onItemSaved) {
              onItemSaved();
            }
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <Container>
      <Card>
        <Label>Nome do Item</Label>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Digite o nome do item"
        />

        <Label>Quantidade</Label>
        <Input
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholder="Digite a quantidade"
        />

        <Label>Preço</Label>
        <Input
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="Digite o preço"
        />

        <Button onPress={handleSave}>
          <ButtonText>
            {item ? 'Atualizar' : 'Adicionar'} Item
          </ButtonText>
        </Button>

        {item && (
          <DeleteButton onPress={handleDelete}>
            <ButtonText>Excluir Item</ButtonText>
          </DeleteButton>
        )}
      </Card>
    </Container>
  );
} 