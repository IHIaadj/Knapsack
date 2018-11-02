import React from 'react';
import { StyleSheet, Text, View, BackHandler ,Animated,Easing} from 'react-native';
import { createStackNavigator } from 'react-navigation';


import Accueil from "./components/Accueil";
import ChoisirPoids from "./components/ChoisirPoids";
import ListPris from "./components/ListPris";


export default createStackNavigator({
  Home: {
    screen: Accueil,
  },
  Poids: {
    screen: ChoisirPoids,
  },
  ListPris:{
    screen:ListPris
  }
}, {
    initialRouteName: 'Home',
    headerMode: 'screen',
    mode: 'modal',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 800,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
});
