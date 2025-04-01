import React from 'react';
import { ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import {
  Container,
  Title,
  Subtitle,
  Label,
  EmptyText,
} from '../styles/global';

const AboutCard = styled.View`
  padding: 24px;
  margin: 16px;
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

const LogoBackground = styled.View`
  width: 120px;
  height: 120px;
  background-color: #FFC107;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
`;

const AboutTitle = styled(Title)`
  color: #FFC107;
  font-size: 28px;
  margin-bottom: 8px;
`;

const AboutSubtitle = styled(Subtitle)`
  color: #7F8C8D;
  font-size: 16px;
  margin-bottom: 32px;
`;

const AboutLabel = styled(Label)`
  color: #ECF0F1;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 24px;
`;

const FeatureItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  padding-left: 16px;
`;

const FeatureText = styled(EmptyText)`
  margin-left: 12px;
  color: #B3B3B3;
  font-size: 15px;
`;

const FooterText = styled(Label)`
  margin-top: 32px;
  text-align: center;
  color: #7F8C8D;
  font-size: 14px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #34495E;
  margin: 24px 0;
`;

const TeamContainer = styled.View`
  margin-top: 16px;
`;

const TeamTitle = styled(Label)`
  text-align: center;
  color: #FFC107;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const TeamMember = styled(Label)`
  text-align: center;
  color: #B3B3B3;
  font-size: 14px;
  margin-bottom: 8px;
`;

export default function AboutScreen() {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AboutCard>
          <LogoContainer>
            <LogoBackground>
              <MaterialCommunityIcons
                name="text-box-check-outline"
                size={64}
                color="#1E2A38"
              />
            </LogoBackground>
          </LogoContainer>

          <AboutTitle>AnotaAi</AboutTitle>
          <AboutSubtitle>Versão 1.0.0</AboutSubtitle>
          
          <AboutLabel>
            O AnotaAi é um aplicativo simples e eficiente para gerenciar sua lista de compras.
            Com ele, você pode:
          </AboutLabel>

          <FeatureItem>
            <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#FFC107" />
            <FeatureText>Adicionar itens à sua lista</FeatureText>
          </FeatureItem>

          <FeatureItem>
            <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={22} color="#FFC107" />
            <FeatureText>Marcar itens como comprados</FeatureText>
          </FeatureItem>

          <FeatureItem>
            <MaterialCommunityIcons name="pencil-outline" size={22} color="#FFC107" />
            <FeatureText>Editar e remover itens</FeatureText>
          </FeatureItem>

          <FeatureItem>
            <MaterialCommunityIcons name="format-list-checks" size={22} color="#FFC107" />
            <FeatureText>Organizar itens em pendentes e concluídos</FeatureText>
          </FeatureItem>

          <FeatureItem>
            <MaterialCommunityIcons name="refresh" size={22} color="#FFC107" />
            <FeatureText>Limpar sua lista quando necessário</FeatureText>
          </FeatureItem>

          <FooterText>
            Obrigado
          </FooterText>

          <Divider />

          <TeamContainer>
            <TeamTitle>Desenvolvido por</TeamTitle>
            <TeamMember>Gabriel Reis</TeamMember>
            <TeamMember>João Pedro</TeamMember>
            <TeamMember>João Vilar</TeamMember>
            <TeamMember>Kethelen Cunha</TeamMember>
            <TeamMember>Renan STF</TeamMember>
            <TeamMember>Rovandro Santos</TeamMember>
            <TeamMember>Yone Yuba</TeamMember>
          </TeamContainer>
        </AboutCard>
      </ScrollView>
    </Container>
  );
} 