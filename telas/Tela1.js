/* Importando as bibliotecas e pacotes necessários*/
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react/cjs/react.development";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

/* Definindo a tela Mapa */
export default function Mapa({ navigation }) {
  
  const [servers, setServers] = useState([]);
/*Acessando uma rota protegida com um Token */
  async function fetchData() {
    const mark = await fetch("https://mobile.ect.ufrn.br:3003/markers", {
      headers: {Authorization: 'Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF',},
    });
    /* Definindo a constante que irá receber os marcadores*/
    const marcadores = await mark.json();

    setServers(marcadores);
  }
  fetchData();

  /*Definindo o MapView e acessando seus atributos no servidor */
  return (
    <View style={styles.bloco}>
      
      <MapView style={styles.mapa}
      initialRegion={{
        latitude: -5.8434642195,
        longitude: -35.1993067557,
        latitudeDelta: 0.0833552,
        longitudeDelta: 0.0333552,
      }}
      
      >
        
      {servers.map((local) => (
          <Marker
            key={local.id}
            title={local.title}
            description={local.description}
            coordinate={{
              latitude: local.latitude,
              longitude: local.longitude,
            }}
          >
          </Marker>
    ))}
      </MapView>
      
      <View style={styles.mapinha}>
      
        <View style={styles.botao}>
          <TouchableOpacity onPress={() => navigation.navigate("AdicionarMarcador")}>
          <Ionicons name="add-circle" size={70} color="green" />
          </TouchableOpacity>
           
       
        </View>
      </View>
    </View>
  );
}
/* Acima a função para acessar a tela que tem a função Marcador, quando pressionado o botão*/
const styles = StyleSheet.create({
  bloco: {
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%",
    flexDirection: "column-reverse",
  },
  mapinha:{ 
    width: "100%", 
    alignItems: "flex-end",
  },
  mapa: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
  },
  botao: {
    borderRadius: 70,
    margin: 20,
  },
});