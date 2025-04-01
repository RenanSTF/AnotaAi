import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #1E2A38;
`;

export const Card = styled.View`
  background-color: #2C3E50;
  border-radius: 12px;
  padding: 16px;
  margin: 8px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #FFC107;
  text-align: center;
  margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: #B3B3B3;
  text-align: center;
  margin-bottom: 24px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #FFC107;
  padding: 16px;
  border-radius: 25px;
  align-items: center;
  margin: 8px 16px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
`;

export const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 700;
`;

export const DeleteButton = styled(Button)`
  background-color: #E74C3C;
`;

export const Input = styled.TextInput`
  background-color: #34495E;
  border-width: 1px;
  border-color: #455A64;
  border-radius: 12px;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 16px;
  color: #FFFFFF;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ECF0F1;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: #B3B3B3;
  text-align: center;
`;

export const ListContainer = styled.View`
  padding: 16px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`; 