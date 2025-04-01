import React, { useRef, useEffect } from 'react';
import { Animated, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShoppingItem as ShoppingItemType } from '../types';

interface ShoppingItemProps {
  item: ShoppingItemType;
  onPress: (item: ShoppingItemType) => void;
  onToggleComplete: (item: ShoppingItemType) => void;
}

interface StyledContainerProps {
  completed: boolean;
  style?: any;
}

const AnimatedContainer = Animated.createAnimatedComponent(
  styled.View<StyledContainerProps>`
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background-color: ${props => props.completed ? '#34495E' : '#2C3E50'};
    border-radius: 12px;
    margin: 6px 0;
    elevation: 3;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 6px;
  `
);

const TouchableItem = styled.TouchableOpacity`
  width: 100%;
`;

const CheckboxContainer = styled.TouchableOpacity`
  margin-right: 12px;
`;

const Content = styled.View`
  flex: 1;
`;

const AnimatedText = Animated.createAnimatedComponent(
  styled.Text<StyledContainerProps>`
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.completed ? '#B3B3B3' : '#ECF0F1'};
  `
);

const ItemQuantity = styled.Text`
  font-size: 14px;
  color: #7F8C8D;
  margin-top: 4px;
`;

const RightContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Badge = styled.View`
  background-color: #FFC107;
  padding: 4px 8px;
  border-radius: 12px;
  margin-left: 8px;
`;

const BadgeText = styled.Text`
  color: #1E2A38;
  font-size: 12px;
  font-weight: bold;
`;

const ItemInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const ItemDetail = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 12px;
`;

const ItemDetailText = styled.Text`
  font-size: 14px;
  color: #7F8C8D;
  margin-left: 4px;
`;

export const ShoppingItem: React.FC<ShoppingItemProps> = ({
  item,
  onPress,
  onToggleComplete,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handleToggle = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onToggleComplete(item);
      rotateAnim.setValue(0);
    });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <AnimatedContainer
      completed={item.completed}
      style={{
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }}
    >
      <TouchableItem onPress={() => onPress(item)}>
        <Content style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckboxContainer onPress={handleToggle}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <MaterialCommunityIcons
                name={item.completed ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                size={24}
                color={item.completed ? "#B3B3B3" : "#FFC107"}
              />
            </Animated.View>
          </CheckboxContainer>
          
          <Content>
            <AnimatedText completed={item.completed}>{item.name}</AnimatedText>
            <ItemInfo>
              <ItemDetail>
                <MaterialCommunityIcons name="package-variant" size={14} color="#7F8C8D" />
                <ItemDetailText>{item.quantity}</ItemDetailText>
              </ItemDetail>
              <ItemDetail>
                <MaterialCommunityIcons name="currency-brl" size={14} color="#7F8C8D" />
                <ItemDetailText>{formatPrice(item.price)}</ItemDetailText>
              </ItemDetail>
            </ItemInfo>
          </Content>
          
          <RightContainer>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#7F8C8D"
            />
          </RightContainer>
        </Content>
      </TouchableItem>
    </AnimatedContainer>
  );
}; 