import React, {useState, useEffect, createContext} from 'react';
import { useContext } from 'react/cjs/react.development';
import { ScrollView, View, Text, Image, Alert } from 'react-native';
import Styled from 'styled-components/native';
import DaumMap from '../../03_Map/DaumMapController';
import Geolocation from 'react-native-geolocation-service';
import { useIsFocused } from '@react-navigation/native';
import Styles from '~/Style';
import {DomainContext} from '~/Context/Domain';
import {launchImageLibrary} from 'react-native-image-picker';
import { UserData } from '~/Context/User';


const Input = Styled.TextInput`
background-color: silver;
width: 60%;
border-bottom-width: 2px;
height: 40px;
`;

const SearchBtn = Styled.TouchableOpacity`
background-color: gold;
width: 30%;
height: 30px;
border-bottom-width: 3px;
`;

const ChangeBtn = Styled.TouchableOpacity`
background-color: pink;
width: 30%;
height: 30px;
border-bottom-width: 3px;
`;

const SearchResultBtn = Styled.TouchableOpacity`
background-color: skyblue;
width: 60%;
border-bottom-width: 3px;
`;

const PlusBtnBox = Styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 200px;
    background-color: transparent;
    margin: 10px 0px 10px 0px;
`;

const PlusText = Styled.Text`
    color: white;
    background-color: skyblue;
    width: 70px;
    height: 50px;
    font-size: 50px;
    font-family: 'DoHyeon-Regular';
    padding: 5px;
    margin: 10px 0px 10px 0px;
    text-align: center;
    border-radius: 10px;
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

const AddChurchPage = ({route, navigation})=>{
    const isFocused = useIsFocused();
    const [imgSrc, setImgSrc] = useState(undefined);

    let defaultLocation = {latitude: 1000.0, longitude: 1000.0};
    let [serchRigion, setSerchRigion] = useState("지역");
    let [lastSerchRegion, setLastSerchRigion] = useState(""); //마지막으로 검색한 내용
    let [resCount, setResCount] = useState(1);
    let [regionIndex, setRegionIndex] = useState(0);
    let [pastorName, setPastorName] = useState("");

    let [location, setLocation] = useState(defaultLocation);
    let [region, setRegion] = useState("");
    let [searchRes, setSearchRes] = useState();
    let [searchChurch, setSearchChurch] = useState();

    const [DaumMapModule, setDaumMap] = useState();
    const domain = useContext(DomainContext);
    const {userData} = useContext(UserData);

    const options = {
        title: 'Load Photo',
        customButton: [
            { name: 'button_id_1', title: 'CustomButton 1'},
            { name: 'button_id_2', title: 'CustomButton 2'},
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    }

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
            setLongitude(returnRegion["x"]);
            setLatitude(returnRegion["y"]);
        })
        
    }, [regionIndex])

    useEffect(()=>
    {
        console.log("use effect searchRes");
        if(searchRes)
        {
            for(let i = 0; i<searchRes.length; ++i)
            {
                <SearchResultBtn onPress={
                    () => {
                        console.log(searchRes[i].place_name);
                        console.log(searchRes[i]);
                    }
                }>
                    <Text>{searchRes[i].place_name}</Text>
                </SearchResultBtn>
            }
        }
    }, [region])

    useEffect(()=>
    {
        console.log("사진사진사진사진");
        setImgSrc({uri: domain});

        console.log(imgSrc);
    },[])

    const showCameraRoll = () => {
        launchImageLibrary(options, (response) => {
            if (response.error) {
                console.log('LaunchCamera Error: ', response.error);
            }
            else {
                console.log('ImageSrc: ' + JSON.stringify(response.assets));
                console.log('ImageSrc: ' + response.assets[0].uri);
                setImgSrc(response.assets[0]);
            }
        });
    }

    return (
        <>
        
            {location ?(
                <>
                    <Text style={Styles.default}> ============================== </Text>
                    <Text style={Styles.default}>Latitude: {location.latitude}</Text>
                    <Text style={Styles.default}>Longitude: {location.longitude}</Text>
                    <Text style={Styles.default}> ============================== </Text>
                </>
            ) : (<Text style={Styles.default}>Loading...</Text>)}
            
            <ScrollView>
            {searchRes ?(
                <>
                {
                    searchRes.map((data, index) => (
                        <SearchResultBtn onPress = {()=>{
                            setRegion(data.place_name);
                            setLocation({longitude: data.x, latitude: data.y});
                            setSearchChurch(data);
                        }}><Text style={Styles.default}>{data.place_name}</Text>
                        </SearchResultBtn>
                    ))
                }
                </>
            ) : (<Text style={Styles.default}>장소를 검색하세요.</Text>)}
            </ScrollView>

            <Input
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={serchRigion}
                    returnKeyType="done"
                    onChangeText={(value) => {
                        console.log(value);
                        serchRigion = setSerchRigion(value);
                    }}
                    
                />

            <View 
                style={{flexDirection: "row"}}>
                <SearchBtn onPress={
                    () => {
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
                    }
                } height = "30%">
                    <Text> Search Locate </Text>
                </SearchBtn>
                
                <ChangeBtn onPress={() => {
                    console.log(searchChurch);
                    console.log(searchChurch["category_name"]);
                    console.log(searchChurch["address_name"]);
                    
                    if(searchChurch["category_name"].indexOf("교회") == -1)
                    {
                        alert("교회가 아닌디용");
                        return;
                    }
                    
                    if(pastorName == "")
                    {
                        alert("담임목사님은 누구신가용");
                        return;
                    }

                    if (location.longitude == 1000.0 && location.latitude == 1000.0)
                        <Text> Default Loacate! need search! </Text>

                    if (location.longitude != 1000.0 && location.latitude != 1000.0) {
                        console.log("sql");
                        
                        const fd = new FormData(); //사진도 추가할거임
                        fd.append('userId', userData.id)
                        fd.append('location', searchChurch["address_name"]);
                        fd.append('description', "우리교회는용 짱이에용");
                        fd.append('file', {
                            uri: imgSrc.uri,
                            type: imgSrc.type,
                            name: imgSrc.fileName,
                            data: imgSrc.data
                        })

        console.log(`${domain}/Church/${region}/${location.longitude}/${location.latitude}/${pastorName}`)          
        fetch(`${domain}/Church/${region}/${location.longitude}/${location.latitude}/${pastorName}`, {
            method: `POST`,
            body: fd,
            headers: {
                Accept: 'application/json', 'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            console.log("뭔가왔어");
            console.log(res.json());
            return res.json();
        }).then(res => 
            {
                console.log("응답이왔어");
                console.log(res)
                //setSearchResult(res);
                //navigation.goBack();
            })

                        // fetch(`${domain}/Church/Add/${region}/${locate_x}/${locate_y}/${pastorName}`).then(res => res.json()).then(res => 
                        //     {
                        //         console.log(res)
                        //         //setSearchResult(res);
                        //         navigation.goBack();
                        //     })
                    }
                }} height = "30%" >
                    <Text> 교회 추가 </Text>
                </ChangeBtn>
            </View>

            {isFocused && <DaumMap currentRegion={{
                    latitude: parseFloat(location.latitude),
                    longitude: parseFloat(location.longitude),
                    zoomLevel: 5,
                }}
                    mapType={"Standard"}
                    style={{ width: 400, height: 150, backgroundColor: 'transparent' }}

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

                <Input
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder= "담임목사 이름을 입력하세요."
                    returnKeyType="done"
                    onChangeText={(value) => {
                        console.log(value);
                        pastorName = setPastorName(value);
                    }}
                    
                />
                
            <PlusBtnBox onPress={() => {showCameraRoll();}}>
                <PlusText>+</PlusText>
                <Text>버튼을 눌러</Text>
                <Text>사진을 추가해보세요</Text>
            </PlusBtnBox>
        </>
    )
}


export {MapData, UserContextProvider};
export default AddChurchPage;