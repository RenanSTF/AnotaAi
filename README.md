# AnotaAi - Lista de Compras

Um aplicativo de lista de compras desenvolvido com React Native e Expo, que permite aos usuários gerenciar seus itens de compra de forma organizada e eficiente.

## 📱 Funcionalidades

- Adicionar itens à lista de compras
- Marcar itens como Caixa ou concluídos
- Editar detalhes dos itens
- Excluir itens
- Limpar listas (Caixa ou concluídas)
- Interface intuitiva e responsiva
- Persistência de dados local

## 🛠️ Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage
- Styled Components

## 📦 Dependências Principais

```json
{
  "@react-navigation/bottom-tabs": "^6.x.x",
  "@react-navigation/drawer": "^6.x.x",
  "@react-navigation/native": "^6.x.x",
  "@react-navigation/native-stack": "^6.x.x",
  "@react-native-async-storage/async-storage": "^1.x.x",
  "react-native-gesture-handler": "^2.x.x",
  "styled-components": "^5.x.x"
}
```

## 🚀 Como Instalar

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
cd AnotaAi
npm install
```

3. Inicie o projeto:
```bash
npx expo start
```

4. Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR Code ou execute em um emulador.

## 📁 Estrutura do Projeto

```
AnotaAi/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── screens/        # Telas do aplicativo
│   ├── styles/         # Estilos globais
│   ├── types/          # Definições de tipos TypeScript
│   └── utils/          # Funções utilitárias
├── App.tsx             # Componente principal
└── package.json        # Dependências e scripts
```

## 📱 Telas e Funcionalidades

### 1. Tela de Itens Caixa (PendingItemsScreen)
- Exibe a lista de itens não concluídos
- Permite adicionar novos itens
- Permite marcar itens como concluídos
- Permite editar itens existentes
- Permite excluir itens
- Permite limpar toda a lista pendente

### 2. Tela de Itens Concluídos (CompletedItemsScreen)
- Exibe a lista de itens marcados como concluídos
- Permite marcar itens como Caixa
- Permite editar itens existentes
- Permite excluir itens
- Permite limpar toda a lista concluída

### 3. Tela de Detalhes do Item (ItemDetailsScreen)
- Permite adicionar novos itens
- Permite editar itens existentes
- Campos:
  - Nome do item
  - Quantidade
  - Preço
- Validações de entrada
- Confirmação antes de excluir

## 💾 Armazenamento de Dados

O aplicativo utiliza o AsyncStorage para persistência local dos dados. A estrutura de dados é:

```typescript
interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ShoppingList {
  items: ShoppingItem[];
}
```

## 🔄 Fluxo de Dados

1. **Adição de Item**:
   - Usuário preenche formulário
   - Dados são validados
   - Item é salvo no AsyncStorage
   - Lista é atualizada

2. **Atualização de Item**:
   - Usuário edita item existente
   - Alterações são salvas
   - Lista é atualizada em todas as telas

3. **Exclusão de Item**:
   - Usuário confirma exclusão
   - Item é removido do AsyncStorage
   - Lista é atualizada

4. **Marcação de Status**:
   - Item é marcado como concluído/pendente
   - Status é atualizado no AsyncStorage
   - Item é movido entre as listas

## 🎨 Estilização

O aplicativo utiliza Styled Components para estilização, com um tema consistente:
- Cores principais
- Tipografia
- Espaçamentos
- Componentes reutilizáveis

## 🔍 Boas Práticas Implementadas

- Tipagem forte com TypeScript
- Componentização
- Separação de responsabilidades
- Tratamento de erros
- Feedback visual para ações do usuário
- Persistência de dados
- Navegação intuitiva

## 📱 Requisitos do Sistema

- Node.js 14.x ou superior
- Expo CLI
- Expo Go (para testes em dispositivo físico)
- Android Studio / Xcode (para emuladores)

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Faça commit das alterações
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.