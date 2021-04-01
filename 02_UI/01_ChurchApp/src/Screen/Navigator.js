import React from 'react';
import {Text} from 'react-native';
import Styled from 'styled-components/native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Default from './Default';

const BottomTab = createBottomTabNavigator();

const BottomTabNavi = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="Home"
                component={Default}
                options={{
                    tarBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
                }}
            />
        </BottomTab.Navigator>
    )
}



const Nvigator = () => {
  return (
    <Text>Hello Navigator</Text>
  );
};


export default Nvigator;
