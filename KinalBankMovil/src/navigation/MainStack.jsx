import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
  </Stack.Navigator>
);

export default MainStack;