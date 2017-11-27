import React from 'react';
import {
  StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity ,StatusBar
,Content,ScrollView,ListView,ActivityIndicator,TouchableHighlight} from 'react-native';
//const list = require('./res.json');

export default class List extends React.Component {
	 setCurrentReadOffset = (event) => {
    console.log(event.nativeEvent.contentOffset.y);
  }

  constructor(props){
		super(props);
		this.state = {
			isLoading: true,
			cloneApp:[],
			search:'',	
			check:[]
		}
	   this.filterSearch = this.filterSearch.bind(this);
	   this.next = this.next.bind(this);
	  
	}
	static navigationOptions = {
		title: 'List',
	};
	componentDidMount(){
		fetch("https://raw.githubusercontent.com/Ploythayanee/resReserApp/master/res.json")
		.then((response)=> response.json())
		.then((responseJson)=> {
			 var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
			 //this.state.cloneApp = ds.cloneWithRows(responseJson.Search);
			 this.setState({
				 isLoading: false,
				 cloneApp: ds.cloneWithRows(responseJson.Search),
				 check: responseJson.Search
			 });
		})
	}
	filterSearch(search){
		var data = this.state.check;
		const newData = data.filter(function(item){
			const itemData = item.Name.toUpperCase()
			const textData = search.toUpperCase()
			return itemData.indexOf(textData) >-1
		})
		this.setState({
			cloneApp: this.state.cloneApp.cloneWithRows(newData),
			search: search
		})
			console.log(this.state.check);
	}
	
	next(id,name){
		console.log(id);
		var {navigate} = this.props.navigation;
		navigate("detail",{title:name,i:id})
	}
  render(){
	 console.log("Getting Data");
	  if(this.state.isLoading){
		  return(
		  <View>
			<ActivityIndicator />
		  </View>
		  );
	  }
	console.log("Already Getting Data");
	console.log(this.state.cloneApp);
	console.log(this.state.check);
	var {params} = this.props.navigation.state;
	console.log(params.name);
    return(
	 <View style={styles.container}>
	  <ScrollView contentContainerStyle={styles.body}>
	   <View style={styles.subbody}>
          <TextInput style={styles.search} keyboardType='ascii-capable' value={this.state.search} 
		  placeholder='Search' onChangeText={(search)=> this.filterSearch(search)}/>
        </View>
        <ListView 
			dataSource={this.state.cloneApp}
			enableEmptySections={true}
			renderRow={(rowData)=>	{
				var id2 = rowData.id;
				var name2 = rowData.Name;
				return(
					<View style={styles.box}>
						
						<View style={styles.row}>
						<View style={{flex:3}}>
							<Image style={styles.img} source={{uri: rowData.Image}}/>
						</View> 
						<View style={{flex:10,padding:5}}>
						<Text style ={styles.title}>{rowData.Name}</Text>
						<Text style ={styles.subtitle}>{rowData.Type}</Text>
						<Image style={styles.star} source={require('./image/stars-5.png')}/>
						<Text style ={styles.review}>{rowData.Review}</Text>
						<TouchableOpacity>
						<Text style={styles.tb} onPress={this.next.bind(this, id2,name2)}>Open</Text>
						</TouchableOpacity>
						</View>
						</View>
						
					</View>
				);
			}		
			}	
		/>   
		</ScrollView>
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