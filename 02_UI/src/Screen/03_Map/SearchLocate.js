import React, {useState, useEffect, createContext} from 'react';
import { useContext } from 'react/cjs/react.development';
import { ScrollView, View, Text, Image, Keyboard } from 'react-native';
import Styled from 'styled-components/native';
import DaumMap from './DaumMapController';
import Geolocation from 'react-native-geolocation-service';
import { useIsFocused } from '@react-navigation/native';
import Styles from '~/Style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBarBox = Styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

const Input = Styled.TextInput`
background-color: lightyellow;
flex: 8;
height: 50px;
border-width: 3px;
font-size: 20px;
color: black;
`;

const SearchBtn = Styled.TouchableOpacity`
background-color: green;
width: 30%;
height: 30px;
border-bottom-width: 3px;
`;

const ChangeBtn = Styled.TouchableOpacity`
background-color: blue;
width: 30%;
height: 30px;
border-bottom-width: 3px;
`;

const SearchResultBtn = Styled.TouchableOpacity`
background-color: skyblue;
width: 60%;
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
    let [serchRigion, setSerchRigion] = useState("지역");
    let [lastSerchRegion, setLastSerchRigion] = useState(""); //마지막으로 검색한 내용
    let [resCount, setResCount] = useState(1);
    let [regionIndex, setRegionIndex] = useState(0);
    let [selectFlag, setSelectRegion] = useState(false);

    const [location, setLocation] = useState(defaultLocation);
    const [region, setRegion] = useState("");
    const [searchRes, setSearchRes] = useState();

    const [DaumMapModule, setDaumMap] = useState();
   
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

    useEffect(() => {
        console.log(regionIndex);
        DaumMap.searchKeyword(serchRigion,null,undefined,undefined,500, regionIndex).then((res) => {
            setResCount(res["meta"].pageable_count)
            let placeName = "";
            for(let i = 0; i < res["documents"].length; ++i)
            {
                let test = res["documents"][i];
                console.log(i + " : " + test.place_name + "/" + test.address_name);
                //
                placeName += test.place_name + "\n";
            }
            let returnRegion = res["documents"][0];
            setRegionIndex(regionIndex++);
            console.log(returnRegion); 
            console.log(resCount);
            console.log(placeName);

            console.log(returnRegion["x"]);
            console.log(returnRegion["y"]);
            console.log(returnRegion["place_name"]);

            let result = res["documents"];
            setRegion(placeName);
            setSearchRes(result);
            setLocation({ longitude: returnRegion["x"], latitude: returnRegion["y"] });
        })
        
    }, [regionIndex])

    useEffect(()=>
    {
        console.log("use effect searchRes");
        if(searchRes)
        {
            for(let i = 0; i<searchRes.length; ++i)
            {
                console.log("@@@@@@");
                console.log(i);
                console.log("@@@@@@");
                <SearchResultBtn onPress={
                    () => {
                        console.log(searchRes[i].place_name);
                    }
                }>
                    <Text>{searchRes[i].place_name}</Text>
                </SearchResultBtn>
            }
        }
    }, [region])

    return (
        <>
            <SearchBarBox>

            <Input
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={'장소를 검색하세요'}
                    returnKeyType="done"
                    onChangeText={(value) => {
                        console.log(value);
                        serchRigion = setSerchRigion(value);
                    }}
                />

            <Icon name="search" color="black" size={40} style={{flex: 1}} onPress={() => {
                        Keyboard.dismiss();
                        if (lastSerchRegion == serchRigion) {
                            setRegionIndex(regionIndex+1);
                            console.log("----------------------------------");
                            console.log("지역인덱스");
                            console.log(regionIndex);
                            console.log("전체개수");
                            console.log(resCount);
                            if (resCount <= regionIndex * 15)
                                setRegionIndex(1);
                             
                            console.log("----------------------------------");
                        }
                        else
                        {
                            setRegionIndex(1);
                            console.log("======");
                            console.log(lastSerchRegion);
                            setLastSerchRigion(serchRigion);
                            console.log("======");
                        }
            }} />
            <Icon name="check" color="green" size={40} style={{flex: 1}} onPress={() => {
                    if(selectFlag == false)
                    {
                        alert('지역을 선택 해 주세요.');
                        return;
                    }
                    if (location.longitude == 1000.0 && location.latitude == 1000.0)
                        <Text> Default Loacate! need search! </Text>

                    if (location.longitude != 1000.0 && location.latitude != 1000.0) {
                        route.params.setLocateProcess([location.longitude, location.latitude]);
                        route.params.setRegionProcess(region);
                        navigation.goBack();
                    }
            }}/>
            </SearchBarBox>
            <ScrollView>
                {searchRes ? (
                    <>
                        {
                            searchRes.map((data, index) => (
                                <SearchResultBtn onPress={() => {
                                    setRegion(data.place_name);
                                    setLocation({ longitude: data.x, latitude: data.y });
                                    setSelectRegion(true);
                                }}><Text style={Styles.default}>{data.place_name}</Text>
                                </SearchResultBtn>
                            ))
                        }
                    </>
                ) : (<View/>)}
            </ScrollView>

            {isFocused && <DaumMap currentRegion={{
                    latitude: parseFloat(location.latitude),
                    longitude: parseFloat(location.longitude),
                    zoomLevel: 5,
                }}
                    mapType={"Standard"}
                    style={{ width: 400, height: 400, backgroundColor: 'transparent' }}

                    markers={[{
                        latitude: parseFloat(location.latitude),
                        longitude: parseFloat(location.longitude),
                        pinColor: "red",
                        pinColorSelect: "yellow",
                        title: region,
                        draggable: true,
                        allClear: true,
                   }]}
                />}

                {location ?(
                <>
                    <Text style={Styles.default}> ============================== </Text>
                    <Text style={Styles.default}>Latitude: {location.latitude}</Text>
                    <Text style={Styles.default}>Longitude: {location.longitude}</Text>
                    <Text style={Styles.default}> ============================== </Text>
                </>
            ) : (<Text style={Styles.default}>Loading...</Text>)}
        </>
    )
}


export {MapData, UserContextProvider};
export default SearchLocate;