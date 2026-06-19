import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import MyAccountsScreen from "../features/accounts/screens/MyAccountsScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="MisCuentas" component={MyAccountsScreen} />
  </Stack.Navigator>
);

export default MainStack;