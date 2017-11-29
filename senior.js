import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
 ScrollView
} from 'react-native';

import MapView from 'react-native-maps';
import * as firebase from 'firebase';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 13.764884;
const LONGITUDE = 100.538265;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

 var config = {
    apiKey: "AIzaSyALBoZmBvPSyU7mUjgxC6AtIQhVCNRMBwM",
    authDomain: "maptracker-1f41f.firebaseapp.com",
    databaseURL: "https://maptracker-1f41f.firebaseio.com",
    projectId: "maptracker-1f41f",
    storageBucket: "maptracker-1f41f.appspot.com",
    messagingSenderId: "559608008415"
  };
  firebase.initializeApp(config);
function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class DefaultMarkers extends React.Component {
  constructor(props) {
    super(props);
	this.database = firebase.database();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
	  modalVisible: false,
	  co:'',
	  topic:'',
	  time:'',
	  des:'',
	  pin:[],
    };
	  this.cancle = this.cancle.bind(this);
	   this.onTest = this.onTest.bind(this);
	   this.pinRef = this.database.ref('markers');
  }
   cancle(){
	    this.setState({
			modalVisible: false,
			});
		
   }
	onTest(){
		var cl = this.state.co;
		var t = this.state.topic;
		var d = this.state.des;
		var tm = this.state.time;
		this.pinRef.transaction((markers)=>{
				if(!markers){
					markers = this.state.markers;
				}
				markers.push({Name:'Demo',Topic:t,Description:d,Time: tm});
				return markers;
			});
		   this.setState({
			   modalVisible: false,
			markers: [
			...this.state.markers,
			{
			coordinate:cl,
			key: id++,
			color: randomColor(),
			title: this.state.topic,
			description: this.state.des,
			time: this.state.time,
			},
		   ],
		   topic:'',
			des:'',
			time:'',
			   });

		   }
		  
	onMapPress(e) {
		this.setState({
		modalVisible: true ,
		co:e.nativeEvent.coordinate,
    });
  }
  
  listeningForPin(){
	  this.pinRef.on('value',(snapshot)=> 
	  {
		  console.log("Pin Add", snapshot.val());
		  this.setState({markers: snapshot.val()}); 
	  })
	
  }
  componentDidmount(){
	  this.listeningForPin();
  }
  render() { 
		console.log(this.state.topic);
	  	console.log(this.state.modalVisible);
    return (
      <View style={styles.container}>
	  
      	  <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
		onLongPress={(e) => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            >
			<MapView.Callout>
			<View style={styles.callout}>
			<Text  style={styles.calloutTitle}>Topic: {marker.title}</Text>
			<Text  style={styles.calloutTitle}>Description: {marker.description}</Text>
			<Text  style={styles.calloutTitle}>Time: {marker.time}</Text>
			</View>
			</MapView.Callout>
			</MapView.Marker>
          ))}
        </MapView>
			<Modal visible={this.state.modalVisible}
		   transparent={true}
		   >
           <View style={styles.login}>
			<View style={styles.wrap}>
            <TextInput style={styles.input} keyboardType='ascii-capable'  value={this.state.topic}
			onChangeText={(t)=> this.setState({topic:t})}
			placeholder='Topic'	
			/>
			<TextInput style={styles.input2} keyboardType='ascii-capable' value={this.state.des}
			onChangeText={(d)=> this.setState({des:d})}
			placeholder='Description'	
			/>
			<TextInput style={styles.input} keyboardType='ascii-capable'  value={this.state.time}
			onChangeText={(ti)=> this.setState({time:ti})}
			placeholder='Time'	
			
			/>
			</View>
			<TouchableOpacity style={styles.button2}>
            <Text style={styles.tb}  onPress={this.onTest.bind(this)} >OK</Text>
            </TouchableOpacity>
			<TouchableOpacity style={styles.button2}>
            <Text style={styles.tb}  onPress={this.cancle.bind(this)} >CANCLE</Text>
            </TouchableOpacity>
			</View>
			</Modal>
			
      </View>
    );
  }
}

DefaultMarkers.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
       flex: 1,
    marginTop:20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  login:{
    width : 280,
    height: 350,
    backgroundColor: '#a3c2db',
    opacity:0.8,
    marginLeft:25,
    marginTop:150,
  },
  input:{
    backgroundColor:'white',
    borderWidth:1,
    padding:10,
	margin:5
	
  }, 
  input2:{
    backgroundColor:'white',
	height: 80,
    borderWidth:1,
    padding:10,
	margin:5
	
  }, 
  button2:{
    backgroundColor:'#6699cc',
    padding:10,
    margin:10,
    //borderWidth:1,
  },
  tb:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight:'bold',
  },
  wrap:{
	  margin:10
  },
  callout:{
	  flex:1,
	  paddingRight: 10,
	  paddingBottom:10,
	  marginRight:10,
	  marginBottom:10
  },
  calloutTitle:{
	  fontSize:16,
  }
});

module.exports = DefaultMarkers;