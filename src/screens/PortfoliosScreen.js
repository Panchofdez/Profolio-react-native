import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import {View, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {Button, Card, Text, SearchBar, Header} from 'react-native-elements';
import {fetchPortfolios} from '../store/actions/portfolios';
import Spacer from '../components/Spacer';
import Loading from '../components/Loading';
import {FontAwesome} from '@expo/vector-icons';
import { createFilter} from 'react-native-search-filter';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const KEYS_TO_FILTER = ['name', 'location', 'type'];

const PortfoliosScreen = ({navigation})=>{
	const portfolios = useSelector((state)=>state.portfolios);
	const [searchTerm, setSearchTerm] = useState('');
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(fetchPortfolios());
	}, [])
	if(portfolios){
		const filteredPortfolios= portfolios.filter(createFilter(searchTerm,KEYS_TO_FILTER))
		return(
			<View style={styles.container}>
				<Header
					containerStyle={{backgroundColor:'#161716', height:0.07*height}}
					centerComponent={{ text: 'Portfolio', style: { color: '#00ad8e', fontSize:20, fontWeight:'bold', marginBottom:25} }}
				/>
				<Spacer>
					<SearchBar
						value={searchTerm}
						onChangeText={setSearchTerm}
						autoCapitalize="none"
						placeholder="Search"
						autoCorrect={false}
						containerStyle={styles.search}
						inputContainerStyle={{backgroundColor:'#fff'}}
						round
						lightTheme
					/>
				</Spacer>

				<FlatList
					data={filteredPortfolios}
					keyExtractor={(p)=>p._id}
					numColumns={2}
					columnWrapperStyle={styles.column}
					renderItem={({item})=>{
						return(
							<TouchableOpacity onPress={()=>navigation.push('PortfolioShow', {itemId:item._id})}>
								<Card
									containerStyle={styles.card}
									imageStyle={styles.image}
									image={{uri:item.profileImage}}
								>
									<Text style={styles.name}>
										{item.name}
									</Text>
									<Text style={styles.type}>
										{item.type}
									</Text>

								</Card>
							</TouchableOpacity>
						)
					}}
				/>

			</View>
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
		backgroundColor:'#161716'
	},
	card:{
		height:220,
		width:180,
		borderRadius:25,
		overflow:'hidden',
		marginHorizontal:10
		
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
 		borderTopColor: 'transparent'
	},
	column:{
		margin:5,
		padding:0
	}
});



export default PortfoliosScreen;