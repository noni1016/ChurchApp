//import basic modules
import React from 'react';
import {Text} from 'react-native';
import Styled from 'styled-components/native';

//import Navigation modules
import 'react-native-gesture-handler' //react-navigation 사용하기 위해 최상위에 필요한 모듈
import {NavigationContainer, StackActions} from '@react-navigation/native'; //Navigation 사용하려면 최상단에 컨테이너 컴포넌트 넣어줄것

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

//import custom screens
import Default from '../99_Etc/Default';
import Home from '~/Screen/02_Main/01_Home/Home';
import Churmmunity from './02_Churmmunity/Churmmunity';
import Profile from './03_Profile/Profile';

const BottomTab = createBottomTabNavigator();

const BottomTabNavi = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />
                }}
            />
            <BottomTab.Screen
                name="Churmmunity"
                component={Churmmunity}
                options={{
                    tabBarIcon: ({color}) => <Icon name="people" color={color} size={26} />
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="account-box" color={color} size={26} />
                }}
            />            
        </BottomTab.Navigator>
    )
}


const  Navigator = () => {
  return (
      <NavigationContainer>
          <BottomTabNavi />
          {/* <MainNavi /> */}
          {/* <Text>Hello Navigator</Text> */}
      </NavigationContainer>
  );
};


export default Navigator;