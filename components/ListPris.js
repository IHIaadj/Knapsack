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
export default class ListPris extends React.Component {
  static colorState=true;

  static navigationOptions={
    headerStyle:{backgroundColor:"#364958"},
    headerTintColor:"#FFF"
  };
  constructor(props){
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      sac:{
        poidsMax:200,
        valeurObtenue:100,
        poidsObtenu:190,
        items:[
        {
          poids : 10,
          valeur : 11,
          nom : "Con",
          pris : true
        },
        {
          poids : 100,
          valeur : 1,
          nom : "Troll",
          pris : true
        },
        {
          poids : 90,
          valeur : 33,
          nom : "Lol",
          pris : false
        },
        {
          poids : 100,
          valeur : 1,
          nom : "Troll",
          pris : true
        },
        {
          poids : 90,
          valeur : 33,
          nom : "Lol",
          pris : false
        },
        {
          poids : 100,
          valeur : 1,
          nom : "Troll",
          pris : true
        },
        {
          poids : 90,
          valeur : 33,
          nom : "Lol",
          pris : false
        },
        {
          poids : 100,
          valeur : 1,
          nom : "Troll",
          pris : true
        },
        {
          poids : 90,
          valeur : 33,
          nom : "Lol",
          pris : false
        },
        {
          poids : 100,
          valeur : 1,
          nom : "Troll",
          pris : true
        },
        {
          poids : 90,
          valeur : 33,
          nom : "Lol",
          pris : false
        },
        {
          poids : 100,
          valeur : 1,
          nom : "Troll",
          pris : true
        },
        {
          poids : 90,
          valeur : 33,
          nom : "Lol",
          pris : false
        },
        {
          poids : 100,
          valeur : 1,
          nom : "Troll",
          pris : true
        },
        {
          poids : 90,
          valeur : 33,
          nom : "Lol",
          pris : false
        },
        {
          poids : 100,
          valeur : 1,
          nom : "Troll",
          pris : true
        },
        {
          poids : 90,
          valeur : 33,
          nom : "FIN",
          pris : false
        }
      ]
      },
      dataSource:null
    }
    /*this.state={
      sac:this.props.navigator.params.sac,
      dataSource:null
    }
    */
    this.state.sac.items.sort(function(a, b) {
        return b.pris - a.pris;
    });
    this.state.dataSource=ds.cloneWithRows(this.state.sac.items);

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
      composant=<Image source={require('C:\\Users\\Asus\\Desktop\\React\\Sac\\assets\\bpwhite.png')}/>
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
          <Text style={styles.nom}>{rowData.nom}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.valeur}>{rowData.poids+" kg"}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.valeur}>{rowData.valeur+" دج "}</Text>
        </View>

      </View>
    );

  }
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Liste des Items</Text>

        <View style={styles.bpwrap}>
          <Image source={require('C:\\Users\\Asus\\Desktop\\React\\Sac\\assets\\backpack.png')} />
          <View style={styles.bpinfowrap}>
            <Text style={styles.bginfo}>Poids : {this.state.sac.poidsObtenu} </Text>
            <Text style={styles.bginfo}>Remplit à: {this.state.sac.poidsObtenu/this.state.sac.poidsMax*100 +"%"} </Text>
            <Text style={styles.bginfo}>Valeur: {this.state.sac.valeurObtenue} </Text>
          </View>

        </View>
        <ScrollView>

          <ListView
            style={styles.listview}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.listItemRender(rowData)}
          />
        </ScrollView>
        <Button
        title="Terminer"
        onPress={()=>navigate("Home")}
        style={styles.button}
        width="150%"
        color="#2D3C49"
        />
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
