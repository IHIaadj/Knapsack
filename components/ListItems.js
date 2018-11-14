import React from "react";
import {ScrollView,Image,ListView,View,Text, TextInput,StyleSheet,Animated,Easing,Button} from "react-native";
/*
sac : {
  poidsMax : valeur,
  poidsObtenu:0,
  valeurObtenue : 0,
  items : [
    0 : {
      poids : valeur,
      valeur : valeur,
      nom : nom,
      pris : false
    } ,
       ....
  ]
}
*/
export default class ListItems extends React.Component {
  static colorState=true;

  static navigationOptions={
    headerStyle:{backgroundColor:"#364958"},
    headerTintColor:"#FFF"
  };

  componentWillReceiveProps({test}) {
    test = JSON.stringify(test); 
    var str = test;
    var test = JSON.parse(str); 
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log("be"+ test); 
    test = ds.cloneWithRows(test); 
    this.setState({...this.state.dataSource, test})
  }

  constructor(props){
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      items : this.props.test, 
      sac:{
        poidsMax:200,
        valeurObtenue:100,
        poidsObtenu:190,
        items:this.props.test
      },
      dataSource:null
    }
    
    /*this.state.items.sort(function(a, b) {
        return b.pris - a.pris;
    });*/
    this.state.dataSource=ds.cloneWithRows(this.props.test);

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
    const listView =<ScrollView> 
    <ListView
      style={styles.listview}
      enableEmptySections={true}
      dataSource={this.state.dataSource}
      renderRow={(rowData) => this.listItemRender(rowData)}
    />
</ScrollView>; 
    const text = <Text> Aucun objet dans la liste </Text>;
    return(
      <View>
        {console.log(this.props.test)}

        { this.props.test[0] == null ? text : listView}
      </View>
    );
  }


}

///const rouge="#F58287";
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



  title:{
    fontSize:30,
    fontFamily:"monospace",
    color:"#364958",
    textAlign:"center",
    marginTop:5,
    marginBottom:5,
  },
  buttonContainer:{
    marginTop:25
  },
  button:{
    marginTop:50
  },
  input:{
    height: 40,
    width:"60%",
    borderColor: 'gray',
    borderWidth: 1,
    textAlign:"center"

  }
});
