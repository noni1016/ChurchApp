import React, {useContext, useEffect, useState} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent, Alert } from 'react-native';
import styled from 'styled-components/native';
import AddBtn from '~/Components/AddBtn'
import { UserData } from '~/Context/User';
import {NativeModules, Button} from 'react-native';
import { getUniqueId, getManufacturer, isEmulator } from 'react-native-device-info';
import PlusBtn from '~/Components/PlusBtn';
import SearchChurchPage from '~/Screen/02_Main/03_Church/SearchChurchPage';
import ChurchView from '~/Screen/02_Main/04_Profile/ChurchView'
import {createStackNavigator} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DomainContext } from '~/Context/Domain';
import { useIsFocused } from '@react-navigation/native';
import DaumMap from '~/Screen/03_Map/DaumMapController';
import EditFeed from '../02_Churmmunity/Group/EditFeed';
import Comments from '~/Components/Comments';
import Feed from '~/Components/Feed';
import SpotCards from '~/Components/SpotCards';
import ClubCards from '~/Components/ClubCards';
import ClubPage from '~/Screen/02_Main/02_Churmmunity/Group/ClubPage'
import SpotPage from '~/Screen/02_Main/02_Churmmunity/Group/SpotPage'
import {TabNavi} from '~/Context/Navi';
import {ProfileMain} from '~/Screen/02_Main/04_Profile/Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Notification from './Notification';

const Stack = createStackNavigator();

const InfoTextBold = styled.Text`
    font-size: 20px;
    font-family: 'DoHyeon-Regular';   
    margin-top: 5px;
    margin-bottom: 5px;
    height: 30px;
`;

const InfoTextBold18 = styled.Text`
    font-size: 18px;
    font-family: 'DoHyeon-Regular';   
    margin-top: 5px;
    margin-bottom: 5px;
    height: 30px;
`;

const UserCardSquare = ({member}) => {
    const domain = useContext(DomainContext);

    useEffect(() => {
        console.log("UserCardSquare")
        console.log(member);
    })

    return (
        <TouchableOpacity style={{alignItems: 'center', margin: 2}} onPress={() => {alert("사람")}}>
            <Image style={{backgroundColor: 'transparent', width: 70, height: 70, margin: 2, borderRadius: 20, borderColor: 'black',  borderWidth: 2}} source={{uri: `${domain}/Profile/${member.photo}` + "?cache="+Math.random()}}/>
            <Text>{member.name}</Text>
        </TouchableOpacity>
    )
}

const HomeMain = ({navigation}) => {
    const { CalendarModule, KakaoMapModule, DaumMapModule } = NativeModules;
    const { userData, setUserData, userChurch } = useContext(UserData);
    const domain = useContext(DomainContext);
    const [neighbors, setNeighbors] = useState([]); //주변 크리스천
    const [neighborMarker, setNeighborMarker] = useState([]);
    
    const [clubs, setClubs] = useState([]); // 주변 클럽
    const [clubMarker, setClubMarker] = useState([]);

    const [spots, setSpots] = useState([]); // 주변 번개
    const [spotMarker, setSpotMarker] = useState([]);

    const [markerList, setMarkers] = useState([]);
    const [markerCategory, setMakerCategory] = useState("All");
    const isFocused = useIsFocused();
    const [reload, setReload] = useState(false);
    const [newSpot, setNewSpot] = useState([]);
    const [newClub, setNewClub] = useState([]);

    useEffect(() => {
        fetch(`${domain}/Group/Sort/Spot/past = 0/id DESC/7`).then(res => res.json()).then(res => {setNewSpot(res)});
        fetch(`${domain}/Group/Sort/Club/1/id DESC/7`).then(res => res.json()).then(res => {setNewClub(res)});
    }, [])

    /* 반경 10 km 이내의 이웃 크리스천 불러오기. 가까운 순서로 정렬 */
    useEffect(() => {
        fetch(`${domain}/User/Neighbor/${userData.id}/${userData.location_ll.x}/${userData.location_ll.y}`).then(res => res.json()).then(res => {console.log(res); setNeighbors(res)});
    }, [userData])

    useEffect(() => {
        fetch(`${domain}/Home/Club/${userData.location_ll.x}/${userData.location_ll.y}`).then(res => res.json()).then(res => {console.log(res); setClubs(res)});
    }, [userData])

    useEffect(() => {
        fetch(`${domain}/Home/Spot/${userData.location_ll.x}/${userData.location_ll.y}`).then(res => res.json()).then(res => {console.log(res); setSpots(res)});
    }, [userData])

    useEffect(() => {
        var temp = [];
        temp.push({
            latitude: parseFloat(userData.location_ll.y),
            longitude: parseFloat(userData.location_ll.x),
            pinColor: "red",
            pinColorSelect: "red",
            title: "내 위치",
            //markerImage: userData.photo,
            draggable: false,
        })

        neighbors.forEach(element => {
            temp.push({
                latitude: parseFloat(element.location_ll.y),
                longitude: parseFloat(element.location_ll.x),
                pinColor: "blue",
                pinColorSelect: "yellow",
                title: element.name,
                draggable: false,
            })
        });

        setNeighborMarker(temp);
        //markerList.push(temp);
        setMakerCategory("All");
    }, [neighbors])

    useEffect(() => {
        var temp = [];
        clubs.forEach(element => {
            temp.push({
                latitude: parseFloat(element.location_ll.y),
                longitude: parseFloat(element.location_ll.x),
                pinColor: "blue",
                pinColorSelect: "yellow",
                title: element.name,
                draggable: false,
            })
        });

        setClubMarker(temp);
        //markerList.push(temp);
        setMakerCategory("All");
    }, [clubs])

    useEffect(() => {
        var temp = [];
        spots.forEach(element => {
            temp.push({
                latitude: parseFloat(element.location_ll.y),
                longitude: parseFloat(element.location_ll.x),
                pinColor: "yellow",
                pinColorSelect: "blue",
                title: element.name,
                draggable: false,
            })
        });

        setSpotMarker(temp);
        //markerList.push(temp);
        setMakerCategory("All");
    }, [spots])

    useEffect(() => {
        var temp = [];
        if(markerCategory == "All")
        {
            neighborMarker.forEach(element => {
                temp.push(element)
            })
            clubMarker.forEach(element => {
                temp.push(element)
            })
            spotMarker.forEach(element => {
                temp.push(element)
            })
        }
        else if(markerCategory == "Neighbor")
        {
            neighborMarker.forEach(element => {
                temp.push(element)
            })
        }
        else if(markerCategory == "Club")
        {
            clubMarker.forEach(element => {
                temp.push(element)
            })
        }
        else if(markerCategory == "Spot")
        {
            spotMarker.forEach(element => {
                temp.push(element)
            })
        }
        setMarkers(temp);
        console.log(temp);
        console.log("markerrrrrrrrr");
        console.log(markerList);
    }, [spotMarker, neighborMarker, clubMarker])
    return (
        <>
        <ScrollView style={{margin: 10}}>
            <InfoTextBold>이웃 크리스천</InfoTextBold>
            <FlatList
                horizontal={true}
                data={neighbors}
                renderItem={({item}) => (<UserCardSquare member={item} />)}
            />
            <InfoTextBold>크리스천 맵</InfoTextBold>
            {isFocused && userData.location_ll && markerList != null &&
            <DaumMap 
                currentRegion={{
                    latitude: parseFloat(userData.location_ll.y),
                    longitude: parseFloat(userData.location_ll.x),
                    zoomLevel: 5
                }}
                mapType={"Standard"}
                style={{ width: 400, height: 400, backgroundColor: 'transparent' }}
                markers={markerList}     
            />
            }
            <InfoTextBold18>이야기</InfoTextBold18>   
            <Feeds reload={reload} setReload={setReload} navigation={navigation}/>
            <SpotCards title={'새로운 번개 예고'} datas={newSpot} stackNavi={navigation}/>
            <ClubCards title={'새 공동체'} orgDatas={newClub} stackNavi={navigation}/>
        </ScrollView>

        <AddBtn OnPressMethod={() => {navigation.navigate('EditFeed', {edit: false, groupType: 'Home', group: {id: 0, name: 'Main Page'}, reload: reload, setReload: setReload, navigation: navigation})}}/>
        </>
    )
}

const Feeds = ({reload, setReload, navigation}) => {
    const domain = useContext(DomainContext);
    const [feeds, setFeeds] = useState([]);
    const fakeGroup = {id: 0}


    /* 피드 100개 날짜 순서로 받아오기 */
    useEffect(() => {
        fetch(`${domain}/Home/Feeds`).then(res => res.json()).then(res => {console.log(res); setFeeds(res)});
    }, [reload])

    return (
        <>
            {feeds.map((item, index) => (
                <Feed groupType={'Home'} group={fakeGroup} feed={item} key={index} reload={reload} setReload={setReload} isMember={true} navigation={navigation}/>
            ))}
        </>
        // <FlatList
        //     data={feeds}
        //     renderItem={({item, index}) => (<Feed groupType={'Home'} group={fakeGroup} feed={item} key={index} onFeedChange={() => {setReload(!reload)}} isMember={true} navigation={navigation}/>)}
        // />
    )

}

const HomeStackNavi = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name={'HomeMain'}
                component={HomeMain}
                options={({navigation}) => ({
                    title: "우리동네 크리스천",
                    headerRight: () => {
                        if (0) return <Icon name="bell-outline" color="black" size={26} onPress={() => navigation.navigate('Notification', {navigation: navigation})} />
                        else return <Icon name="bell-badge-outline" color="red" size={26} onPress={() => navigation.navigate('Notification', {navigation: navigation})} />
                    }
                })}
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
            <Stack.Screen
                name="ChurchView"
                component={ChurchView}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    title: '교회 찾기',
                }}
            />
            <Stack.Screen
                name={'EditFeed'}
                component={EditFeed}
            />
            <Stack.Screen
                name={'Comments'}
                component={Comments}
            />
            <Stack.Screen
                name="SpotPage"
                component={SpotPage}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                    title: '번개 상세보기'
                }}
            />
            <Stack.Screen
                name="ClubPage"
                component={ClubPage}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                    title: '소모임 상세보기'
                }}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileMain}
            />
            <Stack.Screen
                name="Notification"
                component={Notification}
            />
        </Stack.Navigator>
    )
}

const Home = ({navigation}) => {
    const {setTabNavi} = useContext(TabNavi);

    useEffect(() => {
        setTabNavi(navigation);
    }, [navigation])

    return (
        <HomeStackNavi />
    )
}

export default Home;