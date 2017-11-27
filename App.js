import React  from 'react';
import {
  StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity ,StatusBar,ScrollView,Alert
  ,TouchableWithoutFeedback
} from 'react-native';
import login from './log-in.js';
import List from './jsonimport.js';
import Booking from './test.js';
import {StackNavigator} from 'react-navigation';
import DismissKeyboard from 'dismissKeyboard';
import detail from './detail.js';
import reserve from './reserve.js';

	const Navigation = StackNavigator({
		First:{screen: login},
		Second:{screen: List},
		detail: {
			screen: detail,
			 navigationOptions: ({navigation}) => ({
			title: `${navigation.state.params.title}`,
			}),
		},
		reserve: {screen: reserve}
}); 
export default Navigation;