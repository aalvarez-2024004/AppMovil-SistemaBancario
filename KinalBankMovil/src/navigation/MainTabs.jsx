import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreen from '../features/auth/screens/HomeScreen';
import MyAccountsScreen from '../features/accounts/screens/MyAccountsScreen';
import MyTransactionsScreen from "../features/accounts/screens/MyTransactionsScreen";
import ProductsScreen from "../features/products/screens/ProductsScreen";
import ProfileScreen from '../features/auth/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const KB = {
  navy:   '#0F1F3D',
  accent: '#3B7DD8',
  muted:  '#9CA3AF',
};

const MainTabs = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: KB.accent,
        tabBarInactiveTintColor: KB.muted,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#EEF1F5',
          height: 56 + bottomInset,
          paddingBottom: bottomInset,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MisCuentas"
        component={MyAccountsScreen}
        options={{
          title: 'Cuentas',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'card' : 'card-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MisMovimientos"
        component={MyTransactionsScreen}
        options={{
          title: 'Movimientos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'card' : 'card-outline'} size={size} color={color} />
          ),
        }}
      />

      {/* ➕ AGREGADO: Tab de Productos */}
      <Tab.Screen
        name="Productos"
        component={ProductsScreen}
        options={{
          title: 'Productos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'gift' : 'gift-outline'} size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;