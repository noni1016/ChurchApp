//import basic modules
import React, { useContext, useEffect } from 'react';
import {Text} from 'react-native';
import Styled from 'styled-components/native';
import Icon2 from 'react-native-vector-icons/AntDesign';

//import Navigation modules
import 'react-native-gesture-handler' //react-navigation 사용하기 위해 최상위에 필요한 모듈
import {NavigationContainer, StackActions} from '@react-navigation/native'; //Navigation 사용하려면 최상단에 컨테이너 컴포넌트 넣어줄것

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

//import custom screens
import Home from '@/Screen/02_Main/01_Home/Home';
import Churmmunity from '@/Screen/02_Main/02_Churmmunity/Churmmunity';
import Profile from '@/Screen/02_Main/03_Profile/Profile';
import Default from '@/Screen/99_Etc/Default';

// import contexts
import {NaviContextProvider} from '@/Context/Navi';

const BottomTab = createBottomTabNavigator();

const BottomTabNavi = () => {

    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />
                }}
            />
            <BottomTab.Screen
                name="Churmmunity"
                component={Churmmunity}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => <Icon name="people" color={color} size={26} />
                }}
            />
            <BottomTab.Screen
                name="Chat"
                children={(navigation) => <Default navigation={navigation}/>}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon2 name="message1" size={26}/>
                }}
            />  
            <BottomTab.Screen
                name="Profile"
                children={(navigation) => <Profile navigation={navigation}/>}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon name="account-box" color={color} size={26} />
                }}
            />            
        </BottomTab.Navigator>
    )
}


const  Main = () => {

    return (
        <NaviContextProvider>
            <NavigationContainer>
                <BottomTabNavi />
            </NavigationContainer>
        </NaviContextProvider>
        
    );
};


export default Main;
