import React from 'react';
import {
  StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity ,StatusBar
,Content,ScrollView,ListView,ActivityIndicator,TouchableHighlight} from 'react-native';
//const list = require('./res.json');

export default class Third extends React.Component {
	static navigationOptions = {
		title: 'List',
	};
	 constructor(props){
		super(props);
		this.state = {
			i:0,
		}
	   
	  
	}
	componentDidMount(){
	var {params} = this.props.navigation.state;
	console.log(params.i);
	This.setState({i:params.i});
	console.log(this.state.i);
	}
  render(){
    return(
	 <View style={styles.container}>
	   <Text >LOG-IN</Text>
     </View>
    );
  }
}
//export default List;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding:10,
    paddingTop:62,

    borderWidth:1,
    paddingVertical:20,

  },
  row:{
    flexDirection:'row',
    justifyContent: 'flex-start',
  },
  subbody:{
    //backgroundColor:'#993333',
    //borderWidth:1,

  },
  search:{
    width:310,
    height:40,
    borderWidth:2,
    borderRadius:10,
    paddingLeft:10,
    //backgroundColor:'#ecc6c6',
    opacity:0.5,
    margin:5,
    //color:'white',
    fontWeight:'bold',
    fontSize:25,
  },
  img:{
    width:150,
    height:110,
    
  },
  title:{
    marginLeft:100,
    fontSize:20,
    flexWrap: 'wrap',
  },

  tb:{
    fontSize: 10,
    marginLeft:190,
	
    fontWeight:'bold',
  },
  box:{
	  height:112,
	  borderWidth:1,
	  margin:5,
	  borderTopRightRadius:10,
  },
  star:{
	   width:120,
	   height:20,
	   marginLeft:95,
	  
	   marginTop:10,
  },
  review:{
	  fontSize:10,
	  backgroundColor:'transparent',
	  marginLeft:95,
  },
  right:{
	  borderBottomWidth:1,
	  margin:5
  },
  subtitle:{
	  fontSize:10,
	  marginLeft:105,
  },
});