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
    const [neighbors, setNeighbors] = useState([]);
    const isFocused = useIsFocused();
    const [reload, setReload] = useState(false);

    /* 반경 10 km 이내의 이웃 크리스천 불러오기. 가까운 순서로 정렬 */
    useEffect(() => {
        fetch(`${domain}/User/Neighbor/${userData.id}/${userData.location_ll.x}/${userData.location_ll.y}`).then(res => res.json()).then(res => {console.log(res); setNeighbors(res)});
    }, [userData])


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
            {isFocused && userData.location_ll && 
            <DaumMap 
                currentRegion={{
                    latitude: parseFloat(userData.location_ll.y),
                    longitude: parseFloat(userData.location_ll.x),
                    zoomLevel: 5
                }}
                mapType={"Standard"}
                style={{ width: 400, height: 400, backgroundColor: 'transparent' }}
                markers={[{
                    latitude: parseFloat(userData.location_ll.y),
                    longitude: parseFloat(userData.location_ll.x),
                    pinColor: "red",
                    pinColorSelect: "yellow",
                    title: "marker test",
                    draggable: false,
                }]}     
            />
            }
            <InfoTextBold18>이야기</InfoTextBold18>   
            <Feeds reload={reload} setReload={setReload} navigation={navigation}/>
            <InfoTextBold18>새로운 번개 예고</InfoTextBold18>   
            <InfoTextBold18>새로운 공동체</InfoTextBold18>   
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
                options={{title: "우리동네 크리스천"}}
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
        </Stack.Navigator>
    )
}

const Home = () => {
    return (
        <HomeStackNavi />
    )
}

export default Home;