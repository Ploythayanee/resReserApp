import React from 'react';
import {
 AppRegistry, StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity ,StatusBar
,Content,ScrollView,Picker,DatePickerIOS} from 'react-native';

import { StackNavigator } from 'react-navigation';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
} from 'react-native-popup-dialog';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-datepicker'; 
//import { Database } from 'react-native-database';

import * as firebase from 'firebase';


export default class List extends React.Component {

  static navigationOptions = {
        title : 'Reserve',
		  headerLeft: null
    };
  setCurrentReadOffset = (event) => {
    console.log(event.nativeEvent.contentOffset.y);
  }
 
  
  constructor(props){
    super(props);
	this.database = firebase.database();
    this.state = {
	  isDateTimePickerVisible: false,
	  his:[],
	  Resname:'',
      amount: 0,
      i:0,
	  selectedHours: 0,
	  selectedMinutes: 0,
	  date:"2017-06-01",
      time:
        ['11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30',
		'17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00'],
      //  date: new Date(),
      //  timeZoneOffsetInHours: (-1)*(new Date()).getTimezoneOffset()/60
	  title:'',
	  image:'',
	  username:'',

    }
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
    this.plusTime = this.plusTime.bind(this);
    this.minusTime = this.minusTime.bind(this);
    this.confirm = this.confirm.bind(this);
	this.Hisref = this.database.ref('his');
      //this.onDateChange = this.onDateChange.bind(this);
	
  }
	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = (date) => {
		console.log('A date has been picked: ', date);
		this._hideDateTimePicker();
		this.setState({date : date});
	};
	
  plus(){
    this.setState({amount : this.state.amount+1});
  }
  minus(){
    //this.setState({amount : this.state.amount-1});
	if (this.state.amount > 0){
	this.setState({amount : this.state.amount-1});
	}
	else {
	this.setState({amount : 0});
  }
  }
  plusTime(){
	if (this.state.time[this.state.i] !== '22:00'){
	this.setState({i : this.state.i+1});
	}
	else {
	this.setState({i : this.state.i});
	}
  }
  minusTime(){
    if (this.state.time[this.state.i] !== '11:00'){
	this.setState({i : this.state.i-1});
	}
	else {
	this.setState({i : this.state.i});
	}
  }
	confirm(u,na){	
	    var am = this.state.amount;
		var n = this.state.i;
		var d = this.state.date;
		var tm = this.state.time[n];
		var rm = this.state.Resname;
		this.Hisref.transaction((his)=>{
				if(!his){
					his = this.state.his;
				}
				his.push({Name:u,RestaurantName:na,Amount:am,Time:tm,D: d});
				return his;
			});
    this.setState({amount : 0});
    this.setState({i : 0});
    this.setState({date : "2017-06-01"});
    this.popupDialog.dismiss();
    //this.props.navigation.navigate('Home', {title: 'ShinKanZen'})   
  }
    
  listeningForReserve(){
	  this.Hisref.on('value',(snapshot)=> 
	  {
		  console.log("Reserve Add", snapshot.val());
		  this.setState({his: snapshot.val()}); 
	  })
	
  }
   componentDidmount(){
	  this.listeningForReserve();
      
  }
  render(){
	const { selectedHours, selectedMinutes } = this.state;
   const {params} = this.props.navigation.state;
   const {navigate} = this.props.navigation;
   
	var im = params.img;
	var n = params.title;
	var un = params.user;
	console.log(un);
    let i =0;
    return(
	
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.body}>
		    <PopupDialog
    dialogTitle={<DialogTitle title="Reserve detail" />}
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
  >
    <View>
      <Text style={styles.detail}>{n}</Text>
      <Text style={styles.detail}>{this.state.amount} PEOPLE</Text>
      <Text style={styles.detail}>Time : {this.state.time[this.state.i]}</Text>
      <Text style={styles.detail}>Date : {this.state.date}</Text>
      <Text style={styles.detail}>Please come in time between {this.state.time[this.state.i]} - {this.state.time[this.state.i+1]}</Text>
       <TouchableOpacity style={styles.bb}
        onPress={this.confirm.bind(this,un,n)}>
        <Text style={styles.tbooking}>Confirm</Text>
        </TouchableOpacity>
    </View>
  </PopupDialog>
        <Image style={styles.img}  source={{uri:im}}/>
        <View style={styles.subbody}>
          <Text style={styles.name}>{n}</Text>
        </View>
        <View style={styles.subpeo}>
            <View style={styles.tt}>
              <Text style={styles.people}>How Many Dinner? </Text>
              <Text style={styles.dinner}>{this.state.amount} PEOPLE </Text>
            </View>
            <TouchableOpacity style={styles.button}  onPress={this.minus}>
            <Text style={styles.ms}>-</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button}  onPress={this.plus}>
          <Text style={styles.ps}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subpeo}>
          <View style={styles.tt}>
          <Text style={styles.people}>During Time </Text>
		  <Text style={styles.dinner}>{this.state.time[this.state.i]} </Text>
          
          </View>
          <TouchableOpacity style={styles.button} onPress={this.minusTime}>
          <Text style={styles.ms}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.plusTime}>
          <Text style={styles.ps}>+</Text>
          </TouchableOpacity>
        </View>
		
        <View style={styles.subpeo1}>
		
          <View style={styles.tt1}>
          <Text style={styles.people}>Pick a Date </Text>
          </View>
		  
          
		  
		  <View style={styles.tt2}>
        <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
		minDate="2017-06-01"
        maxDate="2100-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36 
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
	 
	  
	  
      </View>
		  
        </View>
		
        <TouchableOpacity style={styles.bb}
        onPress={() => {
          this.popupDialog.show();
        }}>

        <Text style={styles.tbooking}>BOOK THE TABLE</Text>
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
    height:180,
    opacity:0.8,
	margin:10,
  },
  subbody: {
    borderWidth:1,
    height:50,
    margin:5,
    borderRadius:15,
	paddingTop:15
  },
  name: {
    textAlign:'center'
  },
  detail: {
    textAlign:'center',
    padding:10,
    fontSize:15
  },
  subpeo:{
    //borderWidth:1,
    height:75,
    margin:5,
    flexDirection:'row',
  },
  subpeo1:{
    //borderWidth:1,
    height:60,
    margin:5,
    flexDirection:'row',
  },
  people:{
    padding:10,
  },
  button:{
    //borderWidth:1,
    height:45,
    width:50,
    //borderRadius:100,
    //justifyContent:'flex-end',
    marginLeft:20,
    marginTop:10,
	paddingTop:5,
    //backgroundColor:'#568e8f',
    borderColor:'#568e8f',
  },
  ps:{
    textAlign:'center',
    fontSize:35,
	color:'green'
	
  },
  ms:{
    textAlign:'center',
    fontSize:35,
	  color:'red'
  },
  tt:{

    width:150,
  },
  tt1:{

    width:95,
  },
  tt2:{

    padding:5,
  },
  dinner:{
    fontSize:20,
    fontWeight:'bold',
    paddingLeft:20,
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
  pick: {
    borderWidth:1,
    backgroundColor:'white',
    height:30,
    width:80,
    marginLeft:50,
    margin:10,
    borderRadius:10,
  },
  tp:{
    textAlign:'center',
    padding:10,
  }
});


AppRegistry.registerComponent('reserve', () => reserve);