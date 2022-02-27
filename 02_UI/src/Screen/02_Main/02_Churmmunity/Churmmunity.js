import React, { useEffect, useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

import {
    createStackNavigator,
    StackHeaderLeftButtonProps,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ClubCards from '~/Components/ClubCards';
import ClubCardsColView from '~/Screen/02_Main/02_Churmmunity/Group/ClubCardsColView';
import ClubPage from '~/Screen/02_Main/02_Churmmunity/Group/ClubPage'
// import LightCardContainer from '~/Components/LightCardContainer';
// import RecGroupContainer from '~/Components/RecGroupContainer';
// import RecLightContainer from '~/Components/RecLightContainer';
// import Default from '~/Screen/99_Etc/Default'
// import Comments from './Group/Comments';
// import EditFeed from './Group/AddFeed';

import {DomainContext, DomainContextProvider} from '~/Context/Domain';
// import {DataContext, DataContextProvider} from '~/Context/Data';
// import {UserContext} from '~/Context/User';


const Stack = createStackNavigator();


const HeaderButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    width: 120px;
`;

const EmptyArea = styled.View`
    height: 100px;
    background-color: transparent;
`;

var initClub = { id: 0, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 };
var initMyLightData = [{ id: 0, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `로딩중`, time: "0000-00-00 00:00:00", numMember: 0 },
{ id: 1, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `로딩중`, time: "0000-00-00 00:00:00", numMember: 0 }
];


const NoniMain = ({navigation}) => {

    const domain = useContext(DomainContext);
    var [myClubs, SetMyClubs] = useState([initClub]);
    var [myLightDatas, setMyLightDatas] = useState([initMyLightData]);
    var [recGroups, setRecGroups] = useState([initClub]);
    var [recLights, setRecLights] = useState([initMyLightData]);
    // var [loading, setLoading] = useState([]);
    var data = {userId : 3}; // 로그인 기능 완성될때까지 임시 사용

    useEffect(() => {
        fetch(`${domain}/User/${data.userId}/Club`).then(res => res.json()).then(res => {SetMyClubs(res)});
        // fetch(domain + '/Churmmunity/GetMyGroupDatas').then(res => res.json()).then(res=> {setMyGroupDatas(res)});
        // fetch(domain + '/Churmmunity/GetMyLightDatas').then(res => res.json()).then(res => {setMyLightDatas(res)});
        // fetch(domain + '/Churmmunity/GetRecGroupsOrderRand').then(res => res.json()).then(res => {setRecGroups(res)});
        // fetch(domain + '/Churmmunity/GetRecLightsOrderTime').then(res => res.json()).then(res => {setRecLights(res)});
    }, []);

    return (
        <ScrollView>
            <ClubCards title={'내 모임'} orgDatas={myClubs} navigation={navigation}/>
            {/* <LightCardContainer datas={myLightDatas}/> */}
            {/* <GroupCardContainer title={'오늘의 모임'} orgDatas={recGroups} navigation={navigation}/> */}
            {/* <RecLightContainer orgDatas={recLights}/> */}
            <EmptyArea />
        </ScrollView>
    );


};

const NoniNavi = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="[Noni] Churmmunity"
                component={NoniMain}
                options={{
                    headerShown: true,
                    headerRight: () => (
                        <HeaderButtonsContainer>
                            <Icon name="search" size={26} onPress={() => alert('This is a search button!')} />
                            <Icon name="add" size={26} onPress={() => alert('This is an add button!')} />
                        </HeaderButtonsContainer>
                    )
                }}
            />
             <Stack.Screen
                name="ShowMoreClubs"
                component={ClubCardsColView}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    title: '내 모임'
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
            {/*<Stack.Screen
                name="Comments"
                component={Comments}
                options={{
                    headerShown: true,                    
                    headerBackTitleVisible: false,
                    title: '댓글'
                }}
            />
            <Stack.Screen
                name="AddFeed"
                component={EditFeed}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    title: '새 게시물',
                    // headerRight: () => (
                    //         <Icon name="send" size={26} onPress={() => alert('This is an send button!')} />
                    // )
                }}
             /> */}
        </Stack.Navigator>
    )
}


const Churmmunity = () => {

    return (
        <NoniNavi />
    );
};


export default Churmmunity;