import React from 'react';
import styled from 'styled-components/native';
import { ShoppingItem as ShoppingItemType } from '../types';

interface ShoppingItemProps {
  item: ShoppingItemType;
  onPress: (item: ShoppingItemType) => void;
  onToggleComplete: (item: ShoppingItemType) => void;
}

const ItemContainer = styled.TouchableOpacity<{ completed: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  background-color: ${props => props.completed ? '#f5f5f5' : '#fff'};
  border-radius: 8px;
  margin: 4px 8px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const Checkbox = styled.TouchableOpacity<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: #007AFF;
  margin-right: 12px;
  background-color: ${props => props.checked ? '#007AFF' : 'transparent'};
`;

const Content = styled.View`
  flex: 1;
`;

const ItemName = styled.Text<{ completed: boolean }>`
  font-size: 16px;
  font-weight: 500;
  text-decoration-line: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#999' : '#333'};
`;

const ItemQuantity = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

export const ShoppingItem: React.FC<ShoppingItemProps> = ({
  item,
  onPress,
  onToggleComplete,
}) => {
  const handleToggle = () => {
    onToggleComplete(item);
  };

  return (
    <ItemContainer completed={item.completed} onPress={() => onPress(item)}>
      <Checkbox
        checked={item.completed}
        onPress={handleToggle}
      />
      <Content>
        <ItemName completed={item.completed}>{item.name}</ItemName>
        <ItemQuantity>Quantidade: {item.quantity}</ItemQuantity>
      </Content>
    </ItemContainer>
  );
}; 