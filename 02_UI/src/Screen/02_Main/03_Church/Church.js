import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Text, View, RefreshControl, TouchableOpacity } from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TabNavi} from '~/Context/Navi';
import {
    createStackNavigator,
} from '@react-navigation/stack';
import SearchChurchPage from './SearchChurchPage';
import ChurchCard from '~/Components/ChurchCard';
import AddChurchPage from './AddChurchPage';
import ChurchPage from './ChurchPage';
import EditFeed from '~/Screen/02_Main/02_Churmmunity/Group/EditFeed';
import Comments from '~/Components/Comments';
import EditChurchPage from './EditChurchPage';
import EditMembers from '../02_Churmmunity/Group/EditMembers';
import ChurchCardsColView from './ChurchCardsColView';
import { ProfileMain } from '../04_Profile/Profile';
import ClubPage from '../02_Churmmunity/Group/ClubPage';
import SpotPage from '../02_Churmmunity/Group/SpotPage';
import SearchLocate from '~/Screen/03_Map/SearchLocate'
import SearchChurchLocate from '~/Screen/03_Map/SearchChurchLocate';
import GroupNotification from '../02_Churmmunity/Group/GroupNotification';

const Stack = createStackNavigator();

const SearchArea = Styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background-color: transparent;
`;

const SearchBox = Styled.View`
    width: 90%;
    height: 50px;
    background-color: yellow;
    border: 3px solid black;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const InfoTextBold = Styled.Text`
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 30px;
    font-weight: bold;
    /* background-color: yellow; */
`;

const InfoText = Styled.Text`
    font-size: 15px;
    margin-top: 5px;
    padding: 3px;
    height: 30px;
    font-weight: bold;
    border: 1px;
    background-color: white;
`;



const ChurchMain = ({navigation}) => {
    const domain = useContext(DomainContext);
    const {userChurch, updateUserChurch} = useContext(UserData);
    const [churches, setChurches] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [userChurchTopList, setUserChurchTopList] = useState([]);

    useEffect(() => {
        fetch(`${domain}/Church`).then(res => res.json()).then(res => {setChurches(res)});
    }, [])

    useEffect(() => {
        let temp = [];
        for (i = 0; i < 3; i++) {
            temp.push(userChurch[i]);
        }
        console.log(temp);
        setUserChurchTopList(temp);
    }, [userChurch])

    const handleRefresh = async () => {
        console.log('handleRefreshStore');
        setIsRefreshing(true);
        fetch(`${domain}/Church`).then(res => res.json()).then(res => {setChurches(res)});
        setIsRefreshing(false);
    }

    return (
        <ScrollView style={{padding: 10, backgroundColor: "skyblue"}} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}>
            <SearchArea onPress={() => {navigation.navigate('SearchChurchPage')}}>
                <SearchBox>
                    <Text>
                        교회 이름, 지역, 목사님 성함으로 검색하세요
                    </Text>
                </SearchBox>
                <Icon name="search" size={26}/>
            </SearchArea>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}>
                    <InfoTextBold>내가 활동 중인 교회 Top 3</InfoTextBold>
                    <TouchableOpacity onPress={() => {navigation.navigate('ShowMoreChurches', {title: '더보기', churches: userChurch, refreshDataFetch: updateUserChurch})}}>
                        <InfoText>모두 보기</InfoText>
                    </TouchableOpacity>
                </View>
                {userChurchTopList.length > 0 && userChurchTopList.map((data, index) => (<ChurchCard key={index} church={data} navigation={navigation}/>))}
            </View>

            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}>
                    <InfoTextBold>전국 교회 Top 10</InfoTextBold>
                    <TouchableOpacity onPress={() => {navigation.navigate('ShowMoreChurches', {title: '더보기', churches: churches, refreshDataFetch: handleRefresh})}}>
                        <InfoText>모두 보기</InfoText>
                    </TouchableOpacity>
                </View>
                {churches.length > 0 && churches.map((data, index) => (<ChurchCard key={index} church={data} navigation={navigation}/>))}
            </View>

            <View style={{height: 300}}/>

        </ScrollView>
    )
}

const Church = ({navigation}) => {
    const {setTabNavi} = useContext(TabNavi);

    useEffect(() => {
        setTabNavi(navigation);
    }, [navigation]);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'ChurchMain'}
                component={ChurchMain}
            />
            <Stack.Screen 
                name={'SearchChurchPage'}
                component={SearchChurchPage}
            />
            <Stack.Screen 
                name={'AddChurchPage'}
                component={AddChurchPage}
            />
            <Stack.Screen
                name={'ChurchPage'}
                component={ChurchPage}
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
                name={'EditChurchPage'}
                component={EditChurchPage}
            />
            <Stack.Screen
                name={'EditMembers'}
                component={EditMembers}
            />
            <Stack.Screen
                name={'ShowMoreChurches'}
                component={ChurchCardsColView}
            />
            <Stack.Screen
                name={'Profile'}
                component={ProfileMain}
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
                    title: '번개 상세보기'
                }}
            />
            <Stack.Screen
                name={'SearchLocate'}
                component={SearchLocate}
            />
            <Stack.Screen
                name={'SearchChurchLocate'}
                component={SearchChurchLocate}
            />
            <Stack.Screen
                name="GroupNotification"
                component={GroupNotification}
            />
            <Stack.Screen
                name="GroupNotification"
                component={GroupNotification}
            />
        </Stack.Navigator>
    );
};


export default Church;