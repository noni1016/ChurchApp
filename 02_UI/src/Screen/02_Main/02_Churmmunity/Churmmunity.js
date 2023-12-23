import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Button } from 'react-native';
import styled from 'styled-components/native';

import {
    createStackNavigator,
    StackHeaderLeftButtonProps,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SpotCards from '~/Components/SpotCards';
import ClubCards from '~/Components/ClubCards';
import ClubCardsColView from '~/Screen/02_Main/02_Churmmunity/Group/ClubCardsColView';
import SpotCardsColView from '~/Screen/02_Main/02_Churmmunity/Group/SpotCardsColView';
import ClubPage from '~/Screen/02_Main/02_Churmmunity/Group/ClubPage'
import SpotPage from '~/Screen/02_Main/02_Churmmunity/Group/SpotPage'
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

import SearchChurchPage from '~/Screen/02_Main/03_Profile/SearchChurchPage';
import AddChurchPage from '~/Screen/02_Main/03_Profile/AddChurchPage';


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

var initClub = { id: 0, name: `로딩중`, mainImg: `default.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 };
var initSpot = [{ id: 0, name: `로딩중`, mainImg: `default.jpg`, location: `로딩중`, time: "0000-00-00 00:00:00", numMember: 0 },
{ id: 1, name: `로딩중`, mainImg: `default.jpg`, location: `로딩중`, time: "0000-00-00 00:00:00", numMember: 0 }
];


const ChurmmunityMain = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    var [recClubs, setRecClubs] = useState([initClub]);
    var [recSpots, setRecSpots] = useState([initSpot]);
    var [pastSpots, setPastSpots] = useState([initSpot]);
    // var [loading, setLoading] = useState([]);

    const {userData, userClub, userSpot} = useContext(UserData);

    useEffect(() => {
        fetch(`${domain}/Group/Sort/Club/1/Rand()/7`).then(res => res.json()).then(res => {setRecClubs(res)});
        fetch(`${domain}/Group/Sort/Spot/past = 0/time/7`).then(res => res.json()).then(res => {setRecSpots(res)});
        fetch(`${domain}/Group/Sort/Spot/past = 1/time/7`).then(res => res.json()).then(res => {setPastSpots(res)});
        
        console.log('churmmunity main====')
        
        // fetch(domain + '/Churmmunity/GetMyLightDatas').then(res => res.json()).then(res => {setMyLightDatas(res)});
        // fetch(domain + '/Churmmunity/GetRecGroupsOrderRand').then(res => res.json()).then(res => {setRecGroups(res)});
        // fetch(domain + '/Churmmunity/GetRecLightsOrderTime').then(res => res.json()).then(res => {setRecLights(res)});
    }, []);

    useEffect(() => {
        console.log('UserClub changed')
    }, [userClub])

    useEffect(() => {
        console.log('UserSpot changed')
        console.log(userSpot);
    }, [userSpot])

    // useEffect(() => )

    return (
        <ScrollView>
            <ClubCards title={'내 모임'} orgDatas={userClub} stackNavi={navigation}/>
            <ClubCards title={'오늘의 모임'} orgDatas={recClubs} stackNavi={navigation}/>
            <SpotCards title={'참여한 번개 모임'} datas={userSpot} stackNavi={navigation}/>
            <SpotCards title={'다가오는 번개 모임'} datas={recSpots} stackNavi={navigation}/>
            <SpotCards title={'지난 번개 모임'} datas={pastSpots} stackNavi={navigation}/>
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
                children={({navigation}) => <ChurmmunityMain navigation={navigation} reload={0} />}
                options={({navigation}) => ({
                    headerShown: true,
                    headerRight: () => (
                        <HeaderButtonsContainer>
                            <Icon name="search" color="black" size={26} onPress={() => navigation.navigate('SearchGroups', {navigation: navigation})} />
                            <Icon name="add" color="black" size={26} onPress={() => navigation.navigate('EditChurmmunity', {navigation: navigation})} />
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
                name="ShowMoreSpots"
                component={SpotCardsColView}
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
                name="SpotPage"
                component={SpotPage}
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
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    title: '지역 찾기',
                }}
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
                name="AddChurchPage"
                component={AddChurchPage}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    title: '교회 추가',
                }}
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