import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import {View, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {Button, Card, Text, SearchBar, Header} from 'react-native-elements';
import {fetchPortfolios} from '../store/actions/portfolios';
import Spacer from '../components/Spacer';
import {FontAwesome} from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PortfoliosScreen = ({navigation})=>{
	const [search, setSearch]= useState('');
	const portfolios = useSelector((state)=>state.portfolios)
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(fetchPortfolios());
	}, [])
	
	return(
		<View style={styles.container}>
			<Header
				containerStyle={{backgroundColor:'#161716', height:0.06*height}}
				centerComponent={{ text: 'Portfolio', style: { color: '#00ad8e', fontSize:20, fontWeight:'bold', marginBottom:25} }}
			/>
			<Spacer>
				<SearchBar
					value={search}
					onChangeText={setSearch}
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
				data={portfolios}
				keyExtractor={(p)=>p._id}
				numColumns={2}
				columnWrapperStyle={styles.column}
				renderItem={({item})=>{
					return(
						<TouchableOpacity onPress={()=>navigation.navigate('PortfolioShow', {portfolio: item, itemId:item._id})}>
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