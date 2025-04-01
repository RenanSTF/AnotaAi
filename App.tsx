import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';

// Importação das telas
import ItemDetailsScreen from './src/screens/ItemDetailsScreen';
import PendingItemsScreen from './src/screens/PendingItemsScreen';
import CompletedItemsScreen from './src/screens/CompletedItemsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AboutScreen from './src/screens/AboutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2C3E50',
          borderTopWidth: 0,
          elevation: 0,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          shadowColor: 'transparent',
        },
        tabBarActiveTintColor: '#FFC107',
        tabBarInactiveTintColor: '#B3B3B3',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Lista" 
        component={PendingItemsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-checks" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Comprados" 
        component={CompletedItemsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart-check" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2C3E50',
        },
        headerTintColor: '#FFC107',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#1E2A38',
        },
        drawerActiveTintColor: '#FFC107',
        drawerInactiveTintColor: '#B3B3B3',
      }}
    >
      <Drawer.Screen 
        name="AnotaAI" 
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="notebook" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Sobre" 
        component={AboutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Configura a cor da barra de navegação no Android
      NavigationBar.setBackgroundColorAsync("#1E2A38");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#1E2A38" />
          <Stack.Navigator>
            <Stack.Screen 
              name="Main" 
              component={DrawerNavigator} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="ItemDetails" 
              component={ItemDetailsScreen}
              options={{
                title: 'Detalhes do Item',
                headerStyle: {
                  backgroundColor: '#2C3E50',
                },
                headerTintColor: '#FFC107',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
});
