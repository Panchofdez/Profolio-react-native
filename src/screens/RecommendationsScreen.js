import React, {useEffect, useState} from 'react';
import {NavigationEvents} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, SafeAreaView, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {ListItem, Text, ButtonGroup} from 'react-native-elements';
import {getRecommendations, getPortfolio} from '../store/actions/portfolios';
import Spacer from '../components/Spacer';


const RecommendationsScreen = ({navigation})=>{
	const {itemId} = navigation.state.params;
	const [portfolioId, setPortfolioId] = useState(itemId);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const recommendations = useSelector((state)=>state.showPortfolio.recommendations);
	const recommending = useSelector((state)=>state.showPortfolio.recommending);
	const portfolio = useSelector((state)=>state.showPortfolio.portfolio);
	const dispatch =useDispatch();
	useEffect(()=>{
		console.log('Heyyy');
		dispatch(getRecommendations(itemId));
	},[itemId])
	const buttons = ['Recommendations', 'Recommending'];
	return (
		<SafeAreaView style={styles.container}>
			<NavigationEvents onDidFocus={()=>{	
				if(!portfolio || portfolio._id !== itemId){
					dispatch(getRecommendations(itemId));
				}		
			}}/>
			<Spacer>
				<ButtonGroup
					buttons={buttons}
					onPress={setSelectedIndex}
					selectedIndex={selectedIndex}
					selectedButtonStyle={{backgroundColor:'#00ad8e'}}
					containerStyle={{borderRadius:25}}
				/>
			</Spacer>
			{selectedIndex ===0 &&(
				<FlatList
					data={recommendations}
					keyExtractor={(item)=>item._id}
					renderItem={({item})=>(
						<TouchableOpacity onPress={()=>navigation.push('PortfolioShow', {itemId:item.portfolio})}>
							<ListItem
								containerStyle={styles.item}
								leftAvatar={{source:{uri:item.profileImage}}}
								title={item.name}
								titleStyle={styles.text}
								chevron={{color:'white'}}
								bottomDivider
							/>
						</TouchableOpacity>

					)}
				/>

			)}
			{selectedIndex===1 &&(
				<FlatList
					data={recommending}
					keyExtractor={(item)=>item._id}
					renderItem={({item})=>(
						<TouchableOpacity onPress={()=>navigation.push('PortfolioShow', {itemId:item.portfolio})}>
							<ListItem
								containerStyle={styles.item}
								leftAvatar={{source:{uri:item.profileImage}}}
								title={item.name}
								titleStyle={styles.text}
								chevron={{color:'white'}}
								bottomDivider
							/>
						</TouchableOpacity>

					)}
				/>
			)}
			
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	container:{
		flex:1,
		margin:0,
		padding:0,
		backgroundColor:'#161716'
	},
	text:{
		color:'white'
	},
	item:{
		backgroundColor:'transparent'
	}
});


export default RecommendationsScreen;