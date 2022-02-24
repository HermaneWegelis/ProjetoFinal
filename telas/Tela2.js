import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Button, Alert, StyleSheet, Text, TextInput, View, Dimensions, KeyboardAvoidingView } from 'react-native';

export default function AdicionarMarcador() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function markUp() {

    const codigo = 'vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF'

    const response = await fetch("https://mobile.ect.ufrn.br:3003/markers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${codigo}`
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        title: title,
        description: description,
      }),
    })
    
    if (response.status == 200){
      alert(
        "Marcador inserido com sucesso!"
      )  
    }
  }
/* Definindo um mapview e colocando um evento para setar as coordenadas
 que estiverem no ponto tocado pelo usuário no mapview */
/* Em seguida definindo que o marcador terá uma coordenada, 
título e descrição*/
/* Pra finalizar definimos um inputContainer para exibir uma caixa de 
texto para o usuário informar o título e a descrição */

return (
  <View style={styles.bloco}>

    <MapView style={styles.mapa}
    initialRegion={{
      latitude: -5.8434642195,
      longitude: -35.1993067557,
      latitudeDelta: 0.0833552,
      longitudeDelta: 0.0333552,
    }}
     onPress={(event) => {
      setLatitude(event.nativeEvent.coordinate.latitude)
      setLongitude(event.nativeEvent.coordinate.longitude)
    }}>
      <Marker
        coordinate={{latitude: latitude, longitude: longitude}}
        title={title}
        description={description}
      />
    
    </MapView>       
    {/* Usei o KeyboardAvoidingView pois me deparei com o problema do teclado
    aparecendo por cima dos botões, essa função impede que isso aconteça.
    */  }
      <KeyboardAvoidingView style={styles.blocoEntrada} behavior='padding'>
        <Text style= {{color: "black"}}>Título</Text>
        <TextInput style={styles.blocoTitulo} value={title} onChangeText={setTitle} ></TextInput>
        <Text style={{color: "black"}}>Descrição</Text>
        <TextInput style={styles.blocoDescricao} value={description} onChangeText={setDescription} ></TextInput>
        <Button title="Adicionar" color="#01783B"onPress={() => markUp()} />
      </KeyboardAvoidingView>

    </View>
  );
}


const styles = StyleSheet.create({
  bloco: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapa: {
    width: (Dimensions.get('window').width),
    height: (Dimensions.get('window').height) - 230,
  },

  blocoEntrada: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 25,
  },

  blocoTitulo: {
    width: (Dimensions.get('window').width) - 50,
    borderWidth: 2,
    marginBottom: 10,
  },

  blocoDescricao: {
    width: (Dimensions.get('window').width) - 50,
    borderWidth: 2,
    marginBottom: 10,
  }
});
