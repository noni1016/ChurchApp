import React, {useContext, useEffect, useState} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Styled from 'styled-components/native';
import AddBtn from '~/Components/AddBtn'
import { UserData } from '~/Context/User';
import Geolocation from 'react-native-geolocation-service';
import {NativeModules, Button} from 'react-native';
import DaumMap from './DaumMapController';

const data = {id: 5};

const Home = () => {
    const { CalendarModule, KakaoMapModule, DaumMapModule } = NativeModules;

    let defaultLocation = {latitude: 37, longitude: 128};

    const { userData, setUserData } = useContext(UserData);
    const [location, setLocation] = useState(defaultLocation);

    useEffect(() => {
        DaumMap.setRestApiKey("598b6c15a810f443c42c0255a2e607ae");
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
    
    const onPress = async () => {
    }
    
    return (
        <>
        {location ? (
            <>
            <Text> ============================== </Text>
            <Text>Latitude: {location.latitude}</Text>
            <Text>Longitude: {location.longitude}</Text>
            <Text> ============================== </Text>
            </>
        ) : (<Text>Loading...</Text>)}
        <DaumMap
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        zoomLevel: 5,
                    }}
                    mapType={"Standard"}
                    style={{ width: 400, height: 400, backgroundColor: 'transparent'}}
        />

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