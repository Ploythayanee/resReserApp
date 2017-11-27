import React  from 'react';
import {
  StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity ,StatusBar,ScrollView,Alert
} from 'react-native';
//import {Navigator} from 'react-native-deprecated-custom-components';
//import List from './ListRes.js';
import * as firebase from 'firebase';

var config = {
	 apiKey: "AIzaSyBMzgOFn-ctLMCFgSx_WZVL6O1BfCQAajM",
    authDomain: "resapp-eedcc.firebaseapp.com",
    databaseURL: "https://resapp-eedcc.firebaseio.com",
    projectId: "resapp-eedcc",
    storageBucket: "resapp-eedcc.appspot.com",
    messagingSenderId: "986582726044"
};
firebase.initializeApp(config);
const routes = [{index:0,title:'Restaurant List'},{index:1,title:'Restaurant Booking'}];
export default class login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email:"",
			password:"",
			isShowLogin: true,
		}
		
		this.listeningForAuthChange = this.listeningForAuthChange.bind(this);
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
	}
	static navigationOptions = {
		title: 'login',
		header: null

	};
	listeningForAuthChange(){
		firebase.auth().onAuthStateChanged((user)=>{
			console.log('auth',user);
			if(user){
				this.setState({name: user.email});
			} else {
				this.setState({name: 'Anonymous',modalVisible: true});
			}
		});
	}
	login(){
	
		 var {navigate} = this.props.navigation;
		console.log(this.state.email, this.state.password);
		firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
		.then((user)=>{
			this.setState({isShowLogin: true, modalVisible: false});
			console.log("Login user successfully");
			
			navigate("Second",{name: this.state.email})
		}).catch((err)=> {
			alert("An error occured: " + err.message);
			console.log('An error occures', err);
		})
	}
	
	signup(){
		
		return (
		<View style={styles.sign}>
		<Text>Hello</Text>
		</View>
		);
		
	}
	register(){
		console.log(this.state.email, this.state.password);
		firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
		.then((user)=> {
			this.setState({isShowLogin: true, modalVisible: false});
			console.log("Create user successfully");
		}).catch((err)=> {
			alert("An error occured: " + err.description);
			console.log('An error occurred',err);
		})
	}
  render(){
	 //this.props.navigation
	
    return(
      <View style={styles.container}>
	   
        <Image style={styles.img} source={require('./image/img1.jpg')}>
        <View style={styles.head}>
          <Text style={styles.title}>RESTURANT</Text>
        </View>
        <View style={styles.login}>
			
            <TextInput style={styles.input} keyboardType='ascii-capable' value={this.state.email}
			onChangeText={(email)=> this.setState({email})}
			placeholder='Username/Email'/>
            <TextInput style={styles.input} keyboardType='ascii-capable' 
			value= {this.state.password} secureTextEntry={true} placeholder='Password'
			onChangeText={(password)=> this.setState({password})}/>
            <Text style={styles.pass}>Forgot Password?</Text>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.tb} onPress={this.login}>LOG-IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.tb} onPress={this.signup}>SIGN-UP</Text>
            </TouchableOpacity>
			 <Image style={styles.face} source={require('./image/facebook.png')}/>
        </View>
        </Image>




	
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
  },
  img:{
    flex:1,
    width:null,
    height:null,
    resizeMode: 'cover',
    opacity:0.8,
  },
  head:{
    backgroundColor:'white',
    opacity:0.8,
  },
  title:{
    fontSize:30,
    padding:10,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#996600',
  },
  login:{
    width : 280,
    height: 330,
    backgroundColor: '#a3c2db',
    opacity:0.8,
    marginLeft:25,
    marginTop:150,

  },
  input:{
    backgroundColor:'white',
    borderWidth:1,
    padding:10,
    margin:10,
  },
  pass:{
    fontStyle:'italic',
    paddingLeft:150,
  },
  tlg:{
	paddingLeft:10,
	fontSize: 15,
  },
  button:{
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
  face:{
	  width:50,
	  height:50,
	  marginLeft:120,
  },
  sign:{
	 width : 280,
    height: 330,
    backgroundColor: 'black',
    opacity:0.8,
    marginLeft:25,
    marginTop:150,
  }
});