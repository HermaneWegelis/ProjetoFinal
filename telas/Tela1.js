import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react/cjs/react.development";
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Mapa({ navigation }) {
  const [server, setServer] = useState([]);

  async function fetchData() {
    const mark = await fetch("https://mobile.ect.ufrn.br:3003/markers", {
      headers: {Authorization: 'Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF',},
    });
    const marcadores = await mark.json();

    setServer(marcadores);
  }
  fetchData();

  return (
    <View style={styles.container}>
      <MapView style={styles.mapa}>
      {server.map((local) => (
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
          <TouchableOpacity onPress={() => navigation.navigate("Marcador")}>
            <FontAwesome5 name="map-marked" size={70} color="black" />
          </TouchableOpacity>
           
       
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%",
    flexDirection: "column-reverse",
  },
  mapinha:{ 
    width: "100%", 
    alignItems: "flex-end" 
  },
  mapa: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
  },
  botao: {
    borderRadius: 70,
    margin: 20,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});