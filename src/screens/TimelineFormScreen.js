import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView, View, StyleSheet, Dimensions, TextInput, ScrollView} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from '../components/Spacer';
import Loading from '../components/Loading';
import {createTimelinePost} from '../store/actions/myPortfolio';
import {FontAwesome5} from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const TimelineFormScreen = ({navigation})=>{
	const [title, setTitle]=useState('');
	const [date, setDate]=useState('');
	const [text, setText]=useState('');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const handleSubmit=()=>{
		const data ={
			post:{
				title,
				text,
				date
			}
		}
		setLoading(true);
		dispatch(createTimelinePost(data));

	}
	if(loading){
		return <Loading/>
	}else{

		return (
			<SafeAreaView style={styles.container}>
				<ScrollView keyboardShouldPersistTaps="handled">
					<Spacer>
						<Text style={styles.title}>Add achievements, events, education and past jobs to your career timeline</Text>
					</Spacer>
					<Spacer>
						<Input 
							labelStyle={styles.labelStyle} 
							inputStyle={styles.inputStyle} 
							value={title}
							onChangeText={setTitle}
							label="Title"
						/>
					</Spacer>
					<Spacer>
						<Input 
							labelStyle={styles.labelStyle} 
							inputStyle={styles.inputStyle} 
							value={date}
							onChangeText={setDate}
							label="Date"
						/>
					</Spacer>
					<Spacer>
						<Text style={styles.label}>Description</Text>
						<TextInput 
							multiline={true} 
							numberOfLines={3} 
							style={styles.description} 
							value={text} 
							onChangeText={setText}
						/>				
					</Spacer>
					<Spacer>
						<Button 
							buttonStyle={styles.button} 
							title="Add Post To Timeline" 
							onPress={()=>handleSubmit()}
							icon={
								<FontAwesome5
							      name="check-circle"
							      solid
							      size={25}
							      color="white"
							      style={{marginHorizontal:10}}
							    />
							}
						/>	
					</Spacer>
				</ScrollView>
			</SafeAreaView>
		)
	}
}



const styles= StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#161716',
		color:'white'
	},
	button:{
		backgroundColor:'#00ad8e',
		borderRadius:25
	},
	text:{
		color:'white',
		marginBottom:10
	},
	inputStyle:{
		color:'white',
		fontSize:18
	},
	labelStyle:{
		color:'white',
		fontSize:18
	},
	label:{
		color:'white',
		marginBottom:10,
		marginHorizontal:10,
		fontSize:18,
		fontWeight:'bold'
	},
	description:{
		color:'white', 
		borderColor: 'rgba(250,250,250,0.6)',
		borderBottomWidth: 1,
		marginHorizontal:10,
		fontSize:18
	},
	title:{
		color:'white',
		margin:10,
		fontSize:25
	},
});


export default TimelineFormScreen;