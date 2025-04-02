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
  background-color: ${props => (props.completed ? '#f5f5f5' : '#fff')};
  border-radius: 8px;
  margin: 4px 8px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const Checkbox = styled.TouchableOpacity<{ checked: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 12px;
  border-width: 2px;
  border-color: #007AFF;
  margin-right: 12px;
  background-color: ${props => (props.checked ? '#007AFF' : 'transparent')};
`;

const CheckboxText = styled.Text<{ checked: boolean }>`
  font-size: 12px;
  color: ${props => (props.checked ? '#fff' : '#007AFF')};
`;

const Content = styled.View`
  flex: 1;
`;

const ItemName = styled.Text<{ completed: boolean }>`
  font-size: 16px;
  font-weight: 500;
  text-decoration-line: ${props => (props.completed ? 'line-through' : 'none')};
  color: ${props => (props.completed ? '#999' : '#333')};
`;

const ItemDetails = styled.View`
  margin-top: 4px;
`;

const DetailText = styled.Text`
  font-size: 14px;
  color: #666;
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
      {!Boolean(item.completed) && (
        <Checkbox checked={item.completed} onPress={handleToggle}>
          <CheckboxText checked={item.completed}>Adicionar à cesta</CheckboxText>
        </Checkbox>
      )}

      <Content>
        <ItemName completed={item.completed}>{item.name}</ItemName>
        <ItemDetails>
          <DetailText>Quantidade: {item.quantity}</DetailText>
          <DetailText>Valor Unitário: R$ {item.price.toFixed(2)}</DetailText>
          <DetailText>Valor Total: R$ {(item.quantity * item.price).toFixed(2)}</DetailText>
        </ItemDetails>
      </Content>
    </ItemContainer>
  );
};
