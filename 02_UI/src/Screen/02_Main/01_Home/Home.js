import React, {useContext, useEffect, useState} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent, Alert } from 'react-native';
import Styled from 'styled-components/native';
import AddBtn from '~/Components/AddBtn'
import { UserData } from '~/Context/User';
import {NativeModules, Button} from 'react-native';
import { getUniqueId, getManufacturer, isEmulator } from 'react-native-device-info';
import PlusBtn from '~/Components/PlusBtn';
import SearchChurchPage from '~/Screen/02_Main/03_Profile/SearchChurchPage';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const data = {id: 5};

const HomeMain = ({navigation}) => {
    const { CalendarModule, KakaoMapModule, DaumMapModule } = NativeModules;
    const { userData, setUserData } = useContext(UserData);

    useEffect(() => {
        console.log('[[Home]]: userData changed')
    }, [userData])

    return (
        <>
        <Button title="안녕" onPress={() => navigation.navigate('Profile')}/>
        <Button title="Click" color="#841584" onPress={() => {console.log("click test"); alert("oo")}} />
        <PlusBtn text='교회 추가' onPress={() => {navigation.navigate('SearchChurchPage', {navigation: navigation})}}/>
        {userData != null && <View>
            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: userData.photoUrl}} />
          </View>}
          
        {userData == null && <View>
            <Image source={require(`~/Assets/Images/bakery.jpg`)}/>
            </View>}
        </>
    )
}

const HomeStackNavi = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name={'HomeMain'}
                component={HomeMain}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SearchChurchPage"
                component={SearchChurchPage}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    title: '교회 찾기',
                }}
            />
        </Stack.Navigator>
    )
}

const Home = () => {
    return (
        <HomeStackNavi />
    )
}

export default Home;