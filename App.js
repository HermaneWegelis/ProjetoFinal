/* Importando os pacotes necessários*/
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
/* Importando os arquivos js que irão compor o App*/
import Tela1 from "./telas/Tela1";
import  Tela2 from "./telas/Tela2";
/* Definindo o Stack Navigation */
const Stack = createStackNavigator();
/* Posicionando os elementos para navegação entre as telas.*/
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Mapa" component={Tela1} />
        <Stack.Screen name="AdicionarMarcador"  component={Tela2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


