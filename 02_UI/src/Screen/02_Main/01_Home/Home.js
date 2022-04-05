import React, {useContext, useEffect, useState} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Styled from 'styled-components/native';
import AddBtn from '~/Components/AddBtn'
import { UserData } from '~/Context/User';
import Geolocation from 'react-native-geolocation-service';
import {NativeModules, Button} from 'react-native';

const data = {id: 5};

const Home = () => {
    const { CalendarModule } = NativeModules;
    const { userData, setUserData } = useContext(UserData);
    const [location, setLocation] = useState(undefined);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                setLocation({
                    latitude,
                    longitude,
                });
            },
            error => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
    },[])
    
    const onPress = () => {
        console.log('Native Module');
        CalendarModule.createCalendarEvent('testName', 'testLocation');
    }
    
    return (
        <>
        {location ? (
            <>
            <Text>Latitude: {location.latitude}</Text>
            <Text>Longitude: {location.longitude}</Text>
            </>
        ) : (<Text>Loading...</Text>)}

        <Button title="Click" color="#841584" onPress={onPress} />
        {userData != null && <View>
            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: userData.photo + "?cache="+Math.random() }} />
          </View>}
          
        {userData == null && <View>
            <Image source={require(`~/Assets/Images/bakery.jpg`)}/>
            </View>}
        </>


    )
}

export default Home;