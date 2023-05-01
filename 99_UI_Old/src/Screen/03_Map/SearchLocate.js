import React, {useState, useEffect, createContext} from 'react';
import { useContext } from 'react/cjs/react.development';
import { View, Text, Image } from 'react-native';
import Styled from 'styled-components/native';
import DaumMap from './DaumMapController';
import Geolocation from 'react-native-geolocation-service';
import { useIsFocused } from '@react-navigation/native';

const Input = Styled.TextInput`
background-color: yellow;
width: 60%;
border-bottom-width: 3px;
`;

const SearchBtn = Styled.TouchableOpacity`
background-color: green;
width: 20%;
border-bottom-width: 3px;
`;

const ChangeBtn = Styled.TouchableOpacity`
background-color: blue;
width: 15%;
height: 15%;
border-bottom-width: 3px;
`;

//맵 데이터 -- 전역으로 쓸 필요가 있을까
const MapData = createContext({
    mapData : {
        // longitude,
        // latitude,
    },
    
    setMapData : (value) => {
        // longitude = 0;
        // latitude = 0;
    },
});


const UserContextProvider = ({children}) => {
    const [mapData, setMapData] = useState(null);

    return (
        <MapData.Provider value = {{mapData, setMapData}}>
            {children}
        </MapData.Provider>
    )
}

const SearchLocate = ({route, navigation})=>{
    const isFocused = useIsFocused();

    let defaultLocation = {latitude: 1000.0, longitude: 1000.0};
    let serchRigion = "지역";

    const [location, setLocation] = useState(defaultLocation);
    const [region, setRegion] = useState("");
   
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

    useEffect(() => {
        if (location && location.longitude) {
            console.log(location.latitude);
            console.log(location.longitude);
        }
    }, [location])

    return (
        <>
            {location ? (
                <>
                    <Text> ============================== </Text>
                    <Text>Latitude: {location.latitude}</Text>
                    <Text>Longitude: {location.longitude}</Text>
                    <Text>region : {region}</Text>
                    <Text> ============================== </Text>
                </>
            ) : (<Text>Loading...</Text>)}

            <View>
                <Input
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={serchRigion}
                    returnKeyType="done"
                    onChangeText={(value) => {
                        console.log(value);
                        serchRigion = value;
                    }}
                />

                <SearchBtn onPress={
                    () => {
                        console.log("search!!!")
                        console.log(serchRigion);
                        DaumMap.serachAddress(serchRigion).then((res) => {
                            console.log(res["documents"][0]["x"]);
                            console.log(res["documents"][0]["y"]);
                            console.log(res["documents"][0]["address_name"]);

                            setRegion(res["documents"][0]["address_name"]);
                            setLocation({ longitude: res["documents"][0]["x"], latitude: res["documents"][0]["y"] });
                        })
                    }
                }>
                    <Text> Search Locate </Text>
                </SearchBtn>
                
                <ChangeBtn onPress={() => {
                    if (location.longitude == 1000.0 && location.latitude == 1000.0)
                        <Text> Default Loacate! need search! </Text>

                    if (location.longitude != 1000.0 && location.latitude != 1000.0) {
                        route.params.setLocateProcess([location.longitude, location.latitude]);
                        route.params.setRegionProcess(region);
                        navigation.goBack();
                    }
                }}>
                </ChangeBtn>
            </View>
            
            {isFocused && <DaumMap currentRegion={{
                    latitude: parseFloat(location.latitude),
                    longitude: parseFloat(location.longitude),
                    zoomLevel: 5,
                }}
                    mapType={"Standard"}
                    style={{ width: 400, height: 400, backgroundColor: 'transparent' }}

                    markers={[{
                        latitude: parseFloat(data.location_ll.y),
                        longitude: parseFloat(data.location_ll.x),
                        pinColor: "red",
                        pinColorSelect: "yellow",
                        title: "marker test",
                        draggable: true,
                    }]}
                />}
        </>
    )
}


export {MapData, UserContextProvider};
export default SearchLocate;