import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import api from '../api/api';

const PointsScreen = ({ navigation, route }) => {

  const { username } = route.params;
  const { points } = route.params;
  const { time } = route.params;
  const [results, setResults] = useState([]);
  
  async function postScore() {
    try {
      const response = await api.post('/scores',{
          score: points,
          name: username,
 
      })
      console.log(response.data)
      console.log("foi post score sem time")
    }
    catch (err) {
      console.log(err);
    }
   

  }
 
  async function getScore() {
    try {
      const response = await api.get('/scores')
      setResults(response.data)
      console.log(response.data)
    }
    catch (err) {
      console.log(err);
    }
   

  }

  async function postScoreTime() {
    try {
      const response = await api.post('/timedscores',{
 
          score: points,
          name: username,
     
      })
      console.log(response.data)
      console.log("foi post score time")
    }
    catch (err) {
      console.log(err);
    }
   

  }
 
  async function getScoreTime() {
    try {
      const response = await api.get('/timedscores')
      setResults(response.data)
      console.log(response.data)
    }
    catch (err) {
      console.log(err);
    }
   

  }
  

 

  return (
    <View style={styles.container}>

<Button style={styles.btn} onPress={()=>postScore()}  title="Salvar pontuação sem timer"/>
<Button style={styles.btn} onPress={()=>postScoreTime()}  title="Salvar pontuação com timer"/>
<Button style={styles.btn} onPress={()=>getScore()}  title="Verificar pontuaçao sem timer" />
<Button style={styles.btn} onPress={()=>getScoreTime()}  title="Verificar pontuação com timer"/>
<FlatList 
        data={results}
        keyExtractor={item => `${item.id.toString}`}
        renderItem={({ item }) => {
          return(
              <View style={styles.containerSmall}>
                <Text style={styles.name}>
                 Nome do jogador: {item.name}
                </Text>
                <Text style={styles.score}>
                  Pontuação do jogador: {item.score}
                </Text>
              </View>
          )
        }}
      />

      </View>
 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop:30,
    
  },
  containerSmall:{
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop:20
  },
  name:{
    paddingRight:5,
  },
  welcome: {
    fontSize: 50,
    color: '#004',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
  },
  btn:{width:50,height:50,},
  container_name: {
    justifyContent: 'center',
  },
  labelName: {
    fontSize: 30,
    fontFamily: 'monospace',
  },
  textInput: {
    borderWidth: 2,
    margin: 20,
    borderColor: '#008',
    borderRadius: 20,
    padding: 20,
    fontSize: 20,
    fontFamily: 'monospace'
  },
});

export default PointsScreen;
