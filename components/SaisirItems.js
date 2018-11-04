import React from "react";
import {Button,View,Image,StyleSheet,Text,TouchableOpacity,TextInput} from "react-native"
import ListItems from "./ListItems.js"; 
import Modal from "react-native-modal";

export default class SaisirItems extends React.Component {
    static navigationOptions = {
      title: "Saisir vos items", 
      headerStyle:{backgroundColor:"#364958"},
      headerTintColor:"#FFF"
    };
    
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });
    

    addItem(){
        this._toggleModal(); 
        var obj = JSON.parse(this.state.sac);
        obj['Items'].push(this.state.item);
        this.state.sac = JSON.stringify(obj);
        
    }
    setName = (name) =>{
        var obj = JSON.parse(this.state).item;
        obj['nom'] = name; 
        setState({item :JSON.stringify(obj) }); 
    }
    setValue = (value) =>{
        this.state.item.valeur = value; 
    }
    setPoids = (poids) =>{
        this.state.item.poids = poids; 
    }
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state;
        const sac = params ? params.sac : null;
        this.state = {
            isModalVisible: false, 
            item:{nom : "String1", valeur : 5, poids : 5, pris : false}, 
            sac : { 
                poidsMax : sac.poidsMax, 
                poidsObtenu : 0,
                ValeurObtenue : 0, 
                Items : []
            }
        };
    }
    
    render(){
        
        return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={this._toggleModal}>
                <Image source={require("../assets/button.png") } style={{width: 50, height: 50, borderRadius: 150/2}}/>
            </TouchableOpacity>
            <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.modalContent}>
                    <Text>Item details !</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Nom de l'item"
                    onChangeText={this.setName}
                    maxLength = {40}
                    underlineColorAndroid="#f2545B"
                    />
                    <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Valeur de l'item"
                    onChangeText={this.setValue}
                    underlineColorAndroid="#f2545B"
                    />
                    <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Poids de l'item"
                    onChangeText={this.setPoids}
                    underlineColorAndroid="#f2545B"
                    />
                    <TouchableOpacity onPress={this.addItem}>
                    <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <ListItems></ListItems>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
