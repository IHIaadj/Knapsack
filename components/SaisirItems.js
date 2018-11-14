import React from "react";
import {Button,View,Image,StyleSheet,Text,TouchableOpacity,TextInput, ScrollView, ListView, Animated} from "react-native"
import ListItems from "./ListItems.js"; 
import Modal from "react-native-modal";

export default class SaisirItems extends React.Component {
    static navigationOptions = {
      title: "Saisir vos items", 
      headerStyle:{backgroundColor:"#364958"},
      headerTintColor:"#FFF"
    };
    
    
    _toggleModal = () =>{
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    _closeModal = () =>{
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        newItem = Object.assign({}, this.item); 
        let newArray = this.state.Items.slice();
        newArray = newArray.concat([newItem]); 
        items = newArray.slice(); 
        this.setState({ Items: newArray }); 

        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.setState({dataSource : ds.cloneWithRows(newArray)});
    }
    

    _updateName = (text, index) => {
        this.item.name = text;   
    }
    _updateValue = (value, index) => {
        this.item.value = value;
    }
    _updateWeight = (weight, index) => {
        this.item.weight = weight; 
    }

    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state;
        const sac = params ? params.sac : null;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.item = {name : "test", value : 2, weight : 3, pris : false}; 
        this.state = {
            isModalVisible: false,
            CurrentIndex : 0,  
            Item : {name : "test", value : 2, weight : 3, pris : false}, 
            Items: [], 
            sac : { 
                poidsMax : sac.poidsMax, 
                poidsObtenu : 0,
                ValeurObtenue : 0, 
                Items : [ {name : "test", value : 2, weight : 3, pris : false}]
            }, 
            dataSource:null
        };

        this.state.dataSource=ds.cloneWithRows(this.state.Items);
    }
    

    listItemRender(rowData){
        this.colorState=!this.colorState;
        styleContainer={};
        if(this.colorState)
          styleContainer=styles.containerBlue;
        else
          styleContainer=styles.containerRed;
        composant=null;
        if(rowData.pris){
          composant=<Image source={require('../assets/bpwhite.png')}/>
        }
        else {
          composant=<Text style={styles.valeur}>{"____"}</Text>
        }
        return (
          <View style={styleContainer}>
            <View style={styles.itemInfo}>
              {composant}
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.nom}>{rowData.name}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.valeur}>{rowData.weight+" kg"}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.valeur}>{rowData.value+" دج "}</Text>
            </View>
          </View>
        );
    
    }

    render(){
        const listView =<View>
                          <ScrollView> 
                              <ListView
                              style={styles.listview}
                              dataSource={this.state.dataSource}
                              renderRow={(rowData) => this.listItemRender(rowData)}
                              />
                          </ScrollView>
                          <Button
                          title="Remplir le sac"
                          color="#f2545B"
                          style={styles.button}
                          onPress={()=>navigate("Sac", {sac:{poidsMax:this.state.sac.poidsMax, Items: this.state.Items}})}
                          >
                          </Button>
                        </View>; 

        const text = <Text> Aucun objet dans la liste. </Text>;
        const { navigate } = this.props.navigation;

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
                    onChangeText={(text) => this._updateName(text, this.state.CurrentIndex)}
                    maxLength = {40}
                    underlineColorAndroid="#f2545B"
                    />
                    <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Valeur de l'item"
                    onChangeText={(valeur) => this._updateValue(valeur, this.state.CurrentIndex)}
                    underlineColorAndroid="#f2545B"
                    />
                    <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Poids de l'item"
                    onChangeText={(poids) => this._updateWeight(poids, this.state.CurrentIndex)}
                    underlineColorAndroid="#f2545B"
                    />
                    
                    <TouchableOpacity onPress={this._closeModal} style={styles.submit}>
                    <Text>Add Item</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            { this.state.Items[0] == null ? text : listView}
        </View>
        );

    }

}

const rouge="#fff";//"#919BA3";
const bleuFonc="#fff";//"#364958"
const styles = StyleSheet.create({
    bpwrap:{
        justifyContent: 'center',
        flexDirection:"row"
      },
      bpinfowrap:{
        justifyContent: 'center',
        marginLeft:20,
    
      },
      bginfo:{
        fontSize:20,
        marginVertical:5,
        fontFamily:"monospace"
      },
      listview:{
        marginTop : 40
      },
      itemInfo:{
        width:50,
        marginHorizontal:10
      },
      container:{
        flex:1,
        marginHorizontal:3
        ///backgroundColor:"#BDD5EA"
      },
      containerRed: {
        flex: 1,
        alignItems: 'center',
        flexDirection:"row",
        justifyContent: 'center',
        padding:10,
        marginVertical:1,
        backgroundColor: rouge
    
      },
      containerBlue: {
        flex: 1,
        alignItems: 'center',
        flexDirection:"row",
        justifyContent: 'center',
        padding:10,
        marginVertical:1,
        backgroundColor: bleuFonc
    
      },
      nom:{
        fontSize:25,
        color:"#000"
      },
      valeur:{
        color:"#000"
      },
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
  input:{
    height: 40,
    width:"60%",
    borderColor: 'gray',
    borderWidth: 1,
    textAlign:"center"

  }, 
  submit: {
      backgroundColor :"#f2545B",
      marginTop:25, 
      marginBottom : 5, 
      padding : 5

    }
});
