import React, {useContext, useEffect, useState} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Styled from 'styled-components/native';
import AddBtn from '@/Components/AddBtn'
import { UserData } from '@/Context/User';
import {NativeModules, Button} from 'react-native';
import { getUniqueId, getManufacturer, isEmulator } from 'react-native-device-info';

const data = {id: 5};

const Home = ({navigation}) => {
    const { CalendarModule, KakaoMapModule, DaumMapModule } = NativeModules;
    const { userData, setUserData } = useContext(UserData);
    return (
        <>
        <Button title="안녕" onPress={() => navigation.navigate('Profile')}/>
        <Button title="Click" color="#841584" onPress={console.log("click test")} />
        {userData != null && <View>
            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: userData.photo + "?cache="+Math.random() }} />
          </View>}
          
        {userData == null && <View>
            <Image source={require(`@/Assets/Images/bakery.jpg`)}/>
            </View>}
        </>
    )
}

export default Home;