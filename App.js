import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Tela1 from "./telas/Tela1";
import  Tela2 from "./telas/Tela2";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Mapa" component={Tela1} />
        <Stack.Screen name="Marcador"  component={Tela2} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


