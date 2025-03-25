import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShoppingItem as ShoppingItemType, RootStackParamList } from '../types';
import { ShoppingItem } from '../components/ShoppingItem';
import { loadShoppingList, updateItem, deleteItem } from '../utils/storage';

export default function CompletedItemsScreen() {
  const [items, setItems] = useState<ShoppingItemType[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const list = await loadShoppingList();
    setItems(list.items.filter(item => item.completed));
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
}); 