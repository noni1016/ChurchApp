import React, { useEffect, useState, useContext } from 'react';
import { Text, Button, ScrollView, FlatList, Image, View } from 'react-native';
import styled from 'styled-components/native';

import {
    createStackNavigator,
    StackHeaderLeftButtonProps,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import GroupCard from '~/Components/GroupCard';
import GroupCardContainer from '~/Components/GroupCardContainer';
import {DomainContext, DomainContextProvider} from '~/Context/Domain';


const Stack = createStackNavigator();


const HeaderButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    width: 120px;
`;

const MyGroupTitleBox = styled.View`
    background-color: #fef5a9;
    height: 60px;
    justify-content: space-evenly;
`;

const MyGroupTitle = styled.Text`
    font-size: 20px;
    margin-left: 20px;
`;


// var myCommDatas = [
//     { id: 0, name: `우쿨룰루랄라`, mainImg: require(`~/Assets/Images/ins.png`), desc: `우쿨렐레 연습 인증 / 우쿨렐레와 떠나는 찬양 여행`, area: `안양`, category: [`음악/악기`, `작곡`, `여행`], numMember: 10 },
//     { id: 1, name: `377동 크리스천`, mainImg: require(`~/Assets/Images/377dong.png`), desc: `377동 크리스천님들 오세요 ㅎㅎ 우산없이 놀러가기 + 초막골 산책 + 가끔 같이 밥`, area: `군포`, category: [`기도나눔`, `산책`, `다과`], numMember: 4 },
//     { id: 2, name: `377동 크리스천`, mainImg: require(`~/Assets/Images/377dong.png`), desc: `377동 크리스천님들 오세요 ㅎㅎ 우산없이 놀러가기 + 초막골 산책 + 가끔 같이 밥`, area: `군포`, category: [`기도나눔`, `산책`, `다과`], numMember: 4 },
//     { id: 3, name: `377동 크리스천`, mainImg: require(`~/Assets/Images/377dong.png`), desc: `377동 크리스천님들 오세요 ㅎㅎ 우산없이 놀러가기 + 초막골 산책 + 가끔 같이 밥`, area: `군포`, category: [`기도나눔`, `산책`, `다과`], numMember: 4 },

// ];
var recommendGroupDatas = [
    { id: 0, name: `베이킹 선교회`, mainImg: require(`~/Assets/Images/bakery.jpg`), desc: `떡을 나눠주신 예수님처럼, 취미로 만든 베이커리로 이웃에게 사랑을 전합니다.`, area: `의왕`, category: [`전도`, `요리`, `다과`], numMember: 5 },
    { id: 1, name: `안산민턴 (배드민턴)`, mainImg: require(`~/Assets/Images/badminton.png`), desc: `안산역 근처 배드민턴장에서 같이 클리어 10번 이상 랠리 가능하신분 모집합니다!`, area: `안산`, category: [`운동`, `배드민턴`, `작곡`], numMember: 11 }
];
var initMyGroupData = { id: 0, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 };
var initMyLightData = { id: 0, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `로딩중`, time: `0000-00-00 00:00:00`, numMember: 0 };


const NoniMain = () => {

    const domain = useContext(DomainContext);
    var [myGroupDatas, setMyGroupDatas] = useState([initMyGroupData]);
    var [myLightDatas, setMyLightDatas] = useState([initMyLightData]);
    // var [loading, setLoading] = useState([]);

    useEffect(() => {
        // console.log(domain);
        fetch(domain + '/churmmunity/getMyGroupDatas').then(res => res.json()).then(res => {setMyGroupDatas(res)});
        fetch(domain + '/churmmunity/getMyLightDatas').then(res => res.json()).then(res => {setMyLightDatas(res)});
    }, []);

    return (
        <ScrollView>
            <GroupCardContainer datas={myGroupDatas}/>
            <GroupCardContainer datas={myLightDatas}/>
            {/* <LightCardContainer datas={myLightDatas}/> */}
        </ScrollView>
    );

    // return (
    //         <Image style={{height:'100%',width:'100%'}} source={{uri: 'http://175.212.209.93:7009/ins.png'}} />
        
    // )

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
        </Stack.Navigator>
    )
}


const Noni = () => {

    return (
        <DomainContextProvider>
            <NoniNavi />
            {/* <NoniMain /> */}
            {/* <Image style={{height:'100%',width:'100%'}} source={{uri: 'http://175.212.209.93:7009/ins.png'}} /> */}
        </DomainContextProvider>
    );
};


export default Noni;