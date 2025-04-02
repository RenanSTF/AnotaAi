import React from 'react';
import { ScrollView } from 'react-native';
import {
  Container,
  Title,
  Subtitle,
  Card,
  Label,
  EmptyText,
} from '../styles/global';

export default function AboutScreen() {
  return (
    <ScrollView>
      <Container>
        <Card>
          <Title>AnotaAi</Title>
          <Subtitle>Versão 1.0.0</Subtitle>
          
          <Label>
            O AnotaAi é um aplicativo simples e eficiente para gerenciar sua lista de compras.
            Com ele, você pode:
          </Label>

          <EmptyText>• Adicionar itens à sua lista</EmptyText>
          <EmptyText>• Marcar itens como comprados</EmptyText>
          <EmptyText>• Editar e remover itens</EmptyText>
          <EmptyText>• Organizar itens em Caixa e concluídos</EmptyText>
          <EmptyText>• Limpar sua lista quando necessário</EmptyText>

          <Label style={{ marginTop: 24, textAlign: 'center' }}>
            Desenvolvido com ❤️ para facilitar suas compras
          </Label>
        </Card>
      </Container>
    </ScrollView>
  );
} 