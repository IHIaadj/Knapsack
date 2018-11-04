import React from "react";
import {View,Text, TextInput,StyleSheet,Animated,Easing,Button} from "react-native";

const backgroundImage = require('../assets/backpack.png');
const MAX_VALUE_POIDS=1000
const MAX_NB_POS_POIDS=3

export default class ChoisirPoids extends React.Component {
  //onChangeText={(text) => this.setState({text})}
  //value={this.state.text}
  static navigationOptions = {
    headerStyle:{backgroundColor:"#364958"},
    headerTintColor:"#FFF"
  };
  constructor(props) {
        super(props)
        this.animatedValue = new Animated.Value(0);
        this.state = {
          size:1
        }
  }

  setSize(size){
    this.setState({size:size});
  }

  confirmPoids(){
    //this.props.navigation.navigate("SelectItems",{sac:{poidsMax:this.state.size}});
  }
  handleAnimation = (size) => {
    this.setSize(size);
    Animated.timing(this.animatedValue, {
        toValue: size/MAX_VALUE_POIDS,
        duration: 1000,
        easing: Easing.ease
    }).start()
  }
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <Animated.Image
                    source={backgroundImage}
                    resizeMode='cover'
                    style={{
                        position: 'relative',
                        marginTop:90,
                        bottom: 110,
                        height: 90,
                        width: 90,
                        transform: [

                            {
                                scaleX: this.animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 2.3]
                                })
                            },
                            {
                                scaleY: this.animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 2.3]
                                })
                            }
                        ]
                    }}
          />
          <Text style={styles.title}>Choisissez votre sac à dos ! </Text>
          <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={MAX_NB_POS_POIDS}
          placeholder="Capacité maximale du sac"
          onChangeText={this.handleAnimation}
          underlineColorAndroid="#f2545B"
          />
          <View style={styles.buttonContainer}>
            <Button
            title="C'est parti!"
            color="#f2545B"
            style={styles.button}
            onPress={()=>navigate("Items", {sac:{poidsMax:this.state.size}})}
            />
          </View>
      </View>
    )
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
    fontSize:15,
    fontFamily:"monospace",
    color:"#364958",
    marginBottom:10,
    marginTop:-50
  },
  buttonContainer:{
    marginTop:15
  },
  button:{
    marginTop:5
  },
  input:{
    height: 40,
    width:"60%",
    borderColor: 'gray',
    borderWidth: 1,
    textAlign:"center"

  }
});
