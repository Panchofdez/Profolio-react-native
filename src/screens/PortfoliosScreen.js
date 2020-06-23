import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationEvents} from 'react-navigation' 
import {View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {Button, Card, Text, SearchBar, Header, ListItem, Image} from 'react-native-elements';
import {fetchPortfolios} from '../store/actions/portfolios';
import Spacer from '../components/Spacer';
import Loading from '../components/Loading';
import Categories from '../components/Categories';
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import { createFilter} from 'react-native-search-filter';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const KEYS_TO_FILTER = ['name', 'location', 'type'];

const PortfoliosScreen = ({navigation})=>{
	const portfolios = useSelector((state)=>state.portfolios);
	const [searchTerm, setSearchTerm] = useState('');
	const [category, setCategory] = useState(null);
	const [refreshing, setRefreshing] =useState(false);
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(fetchPortfolios());
	}, [])
	const formatBio = (string="") =>{
		const ellipsis = string.length > 80 ? "..." : "";
		return string.substring(0,80) + ellipsis;
	};
	const filterPortfolios = (portfoliosArr, searchTerm)=>{
		const term = searchTerm.trim().toLowerCase();
		if(term ===""){
			return portfoliosArr
		}else{
			return portfoliosArr.filter((portfolio)=>portfolio.name.toLowerCase().indexOf(term) !== -1 || portfolio.type.toLowerCase().indexOf(term)!== -1 || portfolio.location.toLowerCase().indexOf(term)!== -1)
		}
	};
	const filterByCategory = (portfoliosArr, categoryArr)=>{
		return portfoliosArr.filter((portfolio)=>{
			for(let term of categoryArr){
				if(portfolio.type.toLowerCase().indexOf(term.toLowerCase())!== -1){
					return true;
				}

			}
			return false
		})
	}
	const handleRefresh= async ()=>{
		setRefreshing(true);
		setCategory(null);
		await dispatch(fetchPortfolios());
		setRefreshing(false);

	}
	if(portfolios){
		let newPortfolios=portfolios;
		if(category){
			console.log(category);
			newPortfolios=filterByCategory(portfolios, category);
		}
		const filteredPortfolios=filterPortfolios(newPortfolios, searchTerm);
		return(
			<SafeAreaView style={styles.container}>
				<NavigationEvents onWillBlur={()=>setCategory(null)} />
				<FlatList
					data={filteredPortfolios}
					refreshing={refreshing}
					onRefresh={()=>handleRefresh()}
					ListHeaderComponent={
						<View>
							<Header
								containerStyle={{backgroundColor:'#161716', height:0.07*height, borderBottomWidth:0}}
								centerComponent={{ text: 'Visualy', style: { color: '#00ad8e', fontSize:22, fontWeight:'bold', marginBottom:25} }}
							/>
						
							<SearchBar
								value={searchTerm}
								onChangeText={setSearchTerm}
								autoCapitalize="none"
								placeholder="Find a Portfolio"
								autoCorrect={false}
								containerStyle={styles.search}
								inputContainerStyle={{backgroundColor:'#fff'}}
								round
								lightTheme
							/>
							<View style={{marginHorizontal:15, marginTop:5, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
								<Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Popular Categories</Text>
								<TouchableOpacity onPress={()=>{
									setCategory(null);
									setSearchTerm("");
								}}>
									<Text style={{color:'#00ad8e', fontSize:18}}>Reset</Text>
								</TouchableOpacity>
							</View>
							<Categories setCategory={setCategory}/>
						</View>
					}
					keyExtractor={(p)=>p._id}
					renderItem={({item})=>{
						return (
							<TouchableOpacity onPress={()=>navigation.push('PortfolioShow', {itemId:item._id})}>
								<View style={styles.portfolioContainer}>
									<View style={{justifyContent:'flex-start'}}>							
										<Image
											style={{width:150, height:150}}
											containerStyle={{overflow:'hidden',}}
											source={{uri:item.profileImage}}
										/>
									</View>
									<View style={{flex:1, justifyContent:'space-between', paddingVertical:10, paddingHorizontal:15}}>
										<View>
											<Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>{item.name}</Text>
											<Text style={{color:'white', fontWeight:'bold', marginVertical:3}}>{item.type}</Text>
											<Text style={{color:'white'}}>{formatBio(item.about)}</Text>
										</View>
										<View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:10}}>
											<FontAwesome name='thumbs-up' size={20} color='#00ad8e'/>
											<Text style={{color:'white', fontSize:16, marginHorizontal:5}}>{item.recommendations.length}</Text>
											<MaterialCommunityIcons name='comment' size={20} color='#00ad8e'/>
											<Text style={{color:'white' ,fontSize:16, marginHorizontal:5}}>{item.comments.length}</Text>
										</View>
									</View>
								</View>
							</TouchableOpacity>

						)
						
					}}
				/>

			</SafeAreaView>
		)
	}else{
		return <Loading/>;
	}
}



const styles = StyleSheet.create({
	container:{
		flex:1,
		margin:0,
		padding:0,
		backgroundColor:'#161716',
	},
	image:{
	    borderRadius:25
	},
	name:{
		marginBottom:5,
		fontWeight:'bold'
	},
	type:{
		marginBottom:5
	},
	search:{
		backgroundColor:'#161716',
		borderBottomColor: 'transparent',
 		borderTopColor: 'transparent',
 		padding:0,
 		margin:10
	},
	portfolioContainer:{
		flexDirection:'row', 
		height:150,
		margin:10,
		backgroundColor:'#181a18',
		overflow:'hidden',
		borderRadius:15,
		shadowOpacity:0.8,
		shadowRadius:3,
		shadowColor:'black',
		shadowOffset:{width:0, height:1},
		elevation:10
	}
});



export default PortfoliosScreen;

