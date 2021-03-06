import React from "react";
import {Button,View,Image,StyleSheet,Text,BackHandler} from "react-native"
export default class Accueil extends React.Component {
  static navigationOptions = {
        title: 'Accueil',
        header: null,
  };

  quitGame(){
    BackHandler.exitApp();
  }
  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Knapsack</Text>
        <View>
          <View style={styles.buttonContainer}>
            <Image source={require('../assets/backpack.png') } />
          </View>
          <View style={styles.buttonContainer}>
            <Button
            style={styles.button}
            color="#f2545B"
            title="Start Game"
            onPress={()=>navigate("Poids")} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
            style={styles.button}
            width="150%"
            color="#364958"
            title="Quit  Game"
            onPress={this.quitGame}
             />
          </View>
        </View>

        <Text style={styles.signature}>BENMEZIANE Hadjer - DEBBAGH Nadir</Text>
      </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAF5',
    alignItems: 'center',
    justifyContent: 'center',

  },
  title:{
    fontSize:50,
    fontFamily:"monospace",
    color:"#F2545B"
  },
  buttonContainer:{
    marginTop:25
  },
  button:{
    marginTop:5
  }, 
  signature:{
    position:"absolute",
    bottom:5, 
    color:"#a2a2a2"
  }
});
