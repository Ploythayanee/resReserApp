import React from 'react';
import {
  AppRegistry,StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity ,StatusBar
,Content,ScrollView,Picker,DatePickerIOS,} from 'react-native';
//import res from './res.json';
import { StackNavigator } from 'react-navigation';

import DateTimePicker from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-datepicker';
import API from './api.js';



export default class shinkanzen extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            name: '',
            i:0,
        };
        API().then((data) => {
            this.setState({name: data.Search[this.state.i].Name});
        })
            .catch((error)=>{});
    }


    // static separator() {
    //     return (
    //         <View style={{height:1, backgroundColor: '#beebee'}}/>
    //     );
    // }
  componentDidMount(){
	var {params} = this.props.navigation.state;
	var d = params.i-1;
	console.log(d);
	this.setState({i:d});
	console.log(this.state.i);
	}

  setCurrentReadOffset = (event) => {
    console.log(event.nativeEvent.contentOffset.y);
  }
  
	
	
  render(){
      const {params} = this.props.navigation.state;
    const {navigate} = this.props.navigation;
    return(
	
      <View style={styles.container}>
      <StatusBar

          backgroundColor="red"

        />

        <ScrollView contentContainerStyle={styles.body}>
      

        <Image style={styles.img} source={require('./SKZ/shin.jpg')}/>

        <View style={styles.subbody}>
          <Text style={styles.name}>{this.state.name}</Text>
        </View>
        <View style={styles.subbody}>

          <View style={styles.s1}>
            <View style={styles.db}>
            <Image style={styles.img1} source={require('./image/sh1.png')}/>
            </View>

            <View style={styles.db}>
            <Text style={styles.hdetail}> Thammasat University</Text>
            <Text style={styles.detail}>OPEN 11.00 – 22.30</Text>
            <Text style={styles.hdetail}>โทร 095-545-1296 </Text>
            </View>
          </View>

          <View style={styles.s2}>
            <View style={styles.db}>
            <Image style={styles.img1} source={require('./image/sh4.png')}/>
            </View>
            <View style={styles.db}>
            <Text style={styles.hdetail}>Bangkok University</Text>
            <Text style={styles.detail}>OPEN 12.00 – 23.00</Text>
            <Text style={styles.hdetail}>โทร 096-817-8855 </Text>
            </View>
          </View>

          <View style={styles.s3}>
          <View style={styles.db}>
            <Image style={styles.img1} source={require('./image/sh5.png')}/>
           </View>
           <View style={styles.db}>
           <Text style={styles.hdetail}>Kasetsarty University</Text>
            <Text style={styles.detail}>OPEN 12.00 – 14.00</Text>
            <Text style={styles.detail}>& 16.00 – 22.00</Text>
            <Text style={styles.hdetail}>โทร 097-131-4634 </Text>
           </View>
           
          </View>

         

        </View>

        <TouchableOpacity style={styles.bb}
        onPress={ () => navigate('reserve',{title:'shinkanZen'})}>
        <Text style={styles.tbooking}>Reserve</Text>
        </TouchableOpacity>
		
        </ScrollView>
		
      </View>
    );
  }
}
//export default List;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:0,
    borderWidth:1,
    paddingVertical:20,
  },
  img:{
    width:300,
    height:300,
    opacity:0.8,
	margin:10,
  },
  img1:{
    width:100,
    height:100,
  },
  subbody: {
	paddingTop:15
  },
  subhead: {
  padding:5,
  backgroundColor:'#0056d7',
  },
  s1: {
    margin : 10,
  padding:15,
  backgroundColor:'#333333',
  flexDirection:'row',
  },
  s2: {
    margin : 10,
  padding:15,
  backgroundColor:'#336633',
  flexDirection:'row',
  },
  s3: {
  margin : 10,
  padding:15,
  backgroundColor:'#CC6666',
  flexDirection:'row',
  },
  s4: {
    margin : 10,
  padding:15,
  backgroundColor:'#FF6633',
  },
  name: {
    textAlign:'center',
	fontSize:30,
  },
  res: {
    textAlign:'center',
  fontSize:30,
  color:'white'
  },
  hdetail:{
    textAlign:'right',
    color:'white',
    fontSize:15,
    padding:5
  },
    bb:{
    borderWidth:1,
    backgroundColor:'white',
    height:37,
    margin:10,
  paddingTop:7,
    borderRadius:10,
  },
   tbooking:{
    fontSize:10,
    textAlign:'center',
    padding:5,
    color:'black',
    fontWeight:'bold',
  },
  db:{
    flex:1
  },
  detail:{
	  textAlign:'right',
    color:'white',
    fontSize:13,
  }
 
});


AppRegistry.registerComponent('detail', () => detail);


