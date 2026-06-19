import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import HomeScreen from '../features/auth/screens/HomeScreen';

const Tab = createBottomTabNavigator();

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Profile</Text>
  </View>
);

const MainTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home"       component={HomeScreen} />
    <Tab.Screen name="Profile"    component={ProfileScreen} />
  </Tab.Navigator>
);

export default MainTabs;