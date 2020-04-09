import React from 'react';
import {Provider} from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import PortfoliosScreen from './src/screens/PortfoliosScreen';
import PortfolioShowScreen from './src/screens/PortfolioShowScreen';
import MyPortfolioScreen from './src/screens/MyPortfolioScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import AuthenticateUserScreen from './src/screens/AuthenticateUserScreen';
import configureStore from './src/store';
import {setNavigator} from './src/navigationRef';
import {Entypo, FontAwesome5} from '@expo/vector-icons';



const store = configureStore();

const switchNavigator = createSwitchNavigator({
  AuthUser:AuthenticateUserScreen,
  loginFlow:createStackNavigator({
    Signup:{screen:SignupScreen,navigationOptions:{headerShown:false}},
    Signin:{screen:SigninScreen, navigationOptions:{headerShown:false}}
  }),
  mainFlow:createBottomTabNavigator({
    portfoliosFlow:createStackNavigator({
      Portfolios:{screen: PortfoliosScreen, navigationOptions:{headerShown:false}},
      PortfolioShow:{screen:PortfolioShowScreen, navigationOptions:{headerShown:false}}
    }, {
      navigationOptions:{
        tabBarIcon:({tintColor})=><Entypo name="home" size={35} color={tintColor}/>
      }
    }),
    Notifications:{
      screen:NotificationsScreen, 
      navigationOptions:{
        tabBarIcon: ({tintColor})=><FontAwesome5 solid name="bell" size={30} color={tintColor}/>
      }
    },
    MyPortfolio:{
      screen:MyPortfolioScreen,
      navigationOptions:{
        tabBarIcon:({tintColor})=><FontAwesome5 solid name="user" size={30} color={tintColor}/>
      }
    }
  },{
    tabBarOptions: {
      activeTintColor: '#00ad8e',
      inactiveTintColor:'white',
      showLabel:false,
      style: {
        backgroundColor: '#303330',
      },
    }
  })
})


const App = createAppContainer(switchNavigator);


export default ()=>{
  return(
    <Provider store={store}>
      <App ref={(navigator)=>setNavigator(navigator)}/>
    </Provider>
  )
}