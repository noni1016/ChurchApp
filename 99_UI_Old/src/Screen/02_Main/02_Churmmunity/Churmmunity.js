import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Button } from 'react-native';
import styled from 'styled-components/native';

import {
    createStackNavigator,
    StackHeaderLeftButtonProps,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ClubCards from '~/Components/ClubCards';
import ClubCardsColView from '~/Screen/02_Main/02_Churmmunity/Group/ClubCardsColView';
import ClubPage from '~/Screen/02_Main/02_Churmmunity/Group/ClubPage'
import Comments from './Group/Comments';
import EditFeed from './Group/EditFeed';
import EditChurmmunity from './Group/EditChurmmunity';
import EditMembers from './Group/EditMembers';

import { UserData, UserContextProvider } from '~/Context/User';
import {DomainContext, DomainContextProvider} from '~/Context/Domain';
import SearchLocate from '~/Screen/03_Map/SearchLocate';
import SearchGroups from './SearchGroups';
import GroupNotification from '~/Screen/02_Main/02_Churmmunity/Group/GroupNotification';
import {ProfileMain} from '~/Screen/02_Main/03_Profile/Profile';
import {TabNavi} from '~/Context/Navi';


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


const ChurmmunityMain = ({navigation}) => {
    const domain = useContext(DomainContext);
    var [myClubs, setMyClubs] = useState([initClub]);
    var [myLightDatas, setMyLightDatas] = useState([initMyLightData]);
    var [recClubs, setRecClubs] = useState([initClub]);
    var [recLights, setRecLights] = useState([initMyLightData]);
    // var [loading, setLoading] = useState([]);
    //var data = {userId : 3}; // 로그인 기능 완성될때까지 임시 사용
    const {userData} = useContext(UserData);

    useEffect(() => {
        if (userData.id) {
            fetch(`${domain}/User/${userData.id}/Club`).then(res => res.json()).then(res => {setMyClubs(res)});
            fetch(`${domain}/Club/Sort/Rand()/7`).then(res => res.json()).then(res => {setRecClubs(res)});
        }
        
        // fetch(domain + '/Churmmunity/GetMyLightDatas').then(res => res.json()).then(res => {setMyLightDatas(res)});
        // fetch(domain + '/Churmmunity/GetRecGroupsOrderRand').then(res => res.json()).then(res => {setRecGroups(res)});
        // fetch(domain + '/Churmmunity/GetRecLightsOrderTime').then(res => res.json()).then(res => {setRecLights(res)});
    }, []);

    return (
        <ScrollView>
            <ClubCards title={'내 모임'} orgDatas={myClubs} stackNavi={navigation}/>
            <ClubCards title={'오늘의 모임'} orgDatas={recClubs} stackNavi={navigation}/>
            {/* <LightCardContainer datas={myLightDatas}/> */}
            {/* <RecLightContainer orgDatas={recLights}/> */}
            <EmptyArea />
        </ScrollView>
    );


};

const ChurmmunityStackNavi = () => {
    const { userData, setUserData } = useContext(UserData);
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'ChurmmunityMain'}
                children={({navigation}) => <ChurmmunityMain navigation={navigation} />}
                options={({navigation}) => ({
                    headerShown: true,
                    headerRight: () => (
                        <HeaderButtonsContainer>
                            <Icon name="search" size={26} onPress={() => navigation.navigate('SearchGroups', {navigation: navigation})} />
                            <Icon name="add" size={26} onPress={() => navigation.navigate('EditChurmmunity', {navigation: navigation})} />
                        </HeaderButtonsContainer>
                    )
                })}
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
            <Stack.Screen
                name="Comments"
                component={Comments}
                options={{
                    headerShown: true,                    
                    headerBackTitleVisible: false,
                    title: '댓글'
                }}
            />
            <Stack.Screen
                name="EditFeed"
                component={EditFeed}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    title: '새 게시물',
                }}
             />
            <Stack.Screen
                name="EditChurmmunity"
                component={EditChurmmunity}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    title: '새 모임',
                }}
             />
            <Stack.Screen
                name="EditMembers"
                component={EditMembers}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    title: '멤버 관리',
                }}
             />
             <Stack.Screen
                name="SearchLocate"
                component={SearchLocate}
            />
            <Stack.Screen
                name="SearchGroups"
                component={SearchGroups}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="GroupNotification"
                component={GroupNotification}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileMain}
            />
        </Stack.Navigator>
    )
}


const Churmmunity = ({navigation}) => {

    const {setTabNavi} = useContext(TabNavi);

    useEffect(() => {
        setTabNavi(navigation);
    }, [navigation])

    return (        
        <ChurmmunityStackNavi/>
    );
};


export default Churmmunity;