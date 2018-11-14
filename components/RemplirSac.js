import React from "react";
import {Button,View,Image,StyleSheet,Text,TouchableOpacity,Animated,TextInput,Dimensions, Easing} from "react-native"
import * as Animatable from 'react-native-animatable';
import ListItems from "./ListItems.js"; 
import Modal from "react-native-modal";
import * as Progress from 'react-native-progress';


const SCREEN_DIMENSIONS = Dimensions.get('window');
export default class SaisirItems extends React.Component {
    static navigationOptions = {
      title: "Remplissons le Sac ! ", 
      headerStyle:{backgroundColor:"#364958"},
      headerTintColor:"#FFF"
    };

    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state;
        const sac = params ? params.sac : null;

        this.state = {
            progressPoids: 0,
            progressGain : 0, 
            indeterminate: true,
            item1Picture : require('../assets/item1.png'),
            item2Picture : require('../assets/item2.png'), 
            item3Picture : require('../assets/item3.png'), 
            item4Picture : require('../assets/item4.png'), 
            poidsMax : sac.poidsMax, 
            Items : sac.Items, 
            ItemsPris : [], 
            poidsFinal : 0, 
            Gain : 0 
        }
        this.SacADos(this.state.Items, this.state.poidsMax);
        
       
    }

    SacADos(Items, poids){

      nbItems = parseInt(Items.length, 10) + 1; 
      poidsMax = parseInt(poids,10) + 1; 
      var matriceGains = new Array(nbItems);

      var sumPoids = 0; 
      for (var i = 0; i < nbItems - 1; i++) {
        console.log(Items[i]); 
        sumPoids+= parseInt(Items[i].weight,10); 
      }

      console.log(sumPoids); 

      if(sumPoids > poidsMax -1 ){
        console.log("Starting ! ");
        for (var i = 0; i < nbItems; i++) {
          matriceGains[i] = new Array(poidsMax);
        }

        // Initialize the matrice with zeros.
        for(i = 0 ; i < poidsMax; i++){
          for(j = 0; j < nbItems ; j++){
              matriceGains[j][i]  = 0;
          }
        }

        console.log("Init end.  ");

        // Recursively calculate the values of each case 
        for(i = 1; i < poidsMax; i++){
          for(j = 1; j < nbItems ; j++){
              if(i < this.state.Items[j-1].weight){
                  matriceGains[j][i] = parseInt(matriceGains[j-1][i], 10);
              }else {
                  if(matriceGains[j-1][i] > matriceGains[j-1][i-parseInt(this.state.Items[j-1].weight, 10)] + parseInt(this.state.Items[j-1].value,10)){
                      matriceGains[j][i] = parseInt(matriceGains[j-1][i],10);
                  }else {
                      matriceGains[j][i] = parseInt(matriceGains[j-1][i-parseInt(this.state.Items[j-1].weight,10)],10) + parseInt(this.state.Items[j-1].value,10);
                  }
              }
          }
        }

        this.state.Gain= matriceGains[Items.length][poids]; 

        // Get Objects 
        var i = nbItems -1 ; 
        var j = poidsMax -1; 

        while(matriceGains[i][j] == matriceGains[nbItems -1][poidsMax -1]){
          j--; 
        }

        this.state.poidsFinal = j + 1; 

        var i = nbItems -1 ; 
        var j = poidsMax -1; 

        // Get Elements.
        while (j > 0 ){

              while(i > 0 && matriceGains[i][j] == matriceGains[i-1][j] ){
                  i--;
              }
              j = j -  parseInt(this.state.Items[i-1].weight,10);

              if (j >= 0 ){
                  newItem = Object.assign({}, this.state.Items[i-1]); 
                  newItem.pris = true; 
                  let newArray = this.state.ItemsPris.slice();
                  newArray = newArray.concat([newItem]); 
                  this.state.ItemsPris =  newArray; 
              }

              i--;
        }
        console.log(this.state.ItemsPris); 

      }else
      {
        var gain= 0; 
        for (var i = 0; i < nbItems - 1; i++) {
          gain += parseInt(Items[i].value,10); 
          console.log(Items[i]); 
          newItem = Object.assign({}, this.state.Items[i]); 
          newItem.pris = true;
          let newArray = this.state.ItemsPris.slice();
          newArray = newArray.concat([newItem]); 
          this.state.ItemsPris =  newArray; 
        }

        this.state.poidsFinal = sumPoids; 
        this.state.Gain = gain; 
      }
      
    }

    // Launch animation for ProgressBars
    componentDidMount() {
      this.animateProgressPoids();
      this.animateProgressGain();
    }
  

    makeSlideInTranslation(translationType, fromValue, endValue) {
        return {
          from: {
            [translationType]: fromValue,
          },
          to: {
            [translationType]: endValue,
          },
        };
      }
      
    animateProgressPoids() {
        let progress = 0;
        this.setState({ progressPoids : progress });
        setTimeout(() => {
          this.setState({ indeterminate: false });
          setInterval(() => {
            progress += Math.random() / 5;
            if (progress > this.state.poidsFinal/this.state.poidsMax) {
              progress = this.state.poidsFinal/this.state.poidsMax;
            }
            this.setState({ progressPoids : progress });
          }, 500);
        }, 1500);
      }

    animateProgressGain() {
      let progress = 0;
      this.setState({ progressGain : progress });
      setTimeout(() => {
        this.setState({ indeterminate: false });
        setInterval(() => {
          progress += Math.random() / 5;
          if (progress > 1) {
            progress = 1;
          }
          this.setState({ progressGain : progress });
        }, 500);
      }, 1500);
    }

    render(){
        const { navigate } = this.props.navigation;
        const slideInDown = this.makeSlideInTranslation('translateY', -600, 0);
        const slideInDown2 = this.makeSlideInTranslation('translateY', -1000, -90);
        const slideInDown3 = this.makeSlideInTranslation('translateY', -1000, -170);
        const slideInDown4 = this.makeSlideInTranslation('translateY', -1000, -300);
        var i = 0;
             
        const pulse = {
                0: {
                  scale: 1,
                },
                0.5: {
                  scale: 1.5,
                },
                1: {
                  scale: 1,
                },
        };
        return (
        <View style={styles.container}>
           <Animatable.Image 
                animation={slideInDown}
                iterationCount={1}
                direction="alternate"
                iterationDelay={1000}
                source={this.state.item1Picture}
             />
           <Animatable.Image 
                animation={slideInDown2}
                iterationCount={1}
                direction="alternate"
                iterationDelay={1000}
                delay = {1500}
                source={this.state.item2Picture}
             />
            <Animatable.Image 
                animation={slideInDown3}
                iterationCount={1}
                direction="alternate"
                iterationDelay={1000}
                delay = {3000}
                source={this.state.item3Picture}
             />
             <Animatable.Image 
                animation={slideInDown4}
                iterationCount={1}
                direction="alternate"
                iterationDelay={1000}
                delay = {4500}
                source={this.state.item4Picture}
             />
             <View style={{ top : -400}}>
                <Animatable.Image 
                      animation={pulse}
                      easing="ease-in-out-circ"
                      iterationDelay={1000}
                      iterationCount={3}
                      source={require('../assets/backpack.png')}
                 />
              </View>


            <View style={{ marginTop : -300}}>
              <Text>Poids : </Text>
            
                <Progress.Bar 
                  progress={this.state.progressPoids}
                  width={200}
                  animated={true}
                  color="#4e598c" />

                <Animatable.Text 
                  animation="slideInLeft"
                  easing="ease-in-out-circ"
                  delay={6000}
                  iterationCount={1}
                  color="#f2545B"
                  style={{fontSize : 12}}
                > {this.state.poidsFinal} </Animatable.Text>
            

              <Text>Gain : </Text>
            
              <Progress.Bar 
                progress={this.state.progressGain}
                width={200}
                animated={true}
                color="#4e598c" />
              <Animatable.Text 
                  animation="slideInLeft"
                  easing="ease-in-out-circ"
                  delay={6000}
                  iterationCount={1}
                  color="#f2545B"
                  style={{fontSize : 12}}
                > {this.state.Gain} </Animatable.Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
              title="Afficher la liste des Items"
              color="#f2545B"
              style={styles.button}
              onPress={()=>navigate("ListPris", {sac : { items : this.state.ItemsPris, poidsObtenu : this.state.poidsFinal, poidsMax : this.state.poidsMax, valeurObtenue : this.state.Gain }})}
              />
          </View>
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
  buttonContainer:{
    marginTop:15
  },
  button:{
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    top: 10, 
    right : 0, 
    zIndex: 5
  }, 
  
});
