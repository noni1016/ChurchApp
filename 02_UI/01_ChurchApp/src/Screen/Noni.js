import React, {useLayoutEffect} from 'react';
import {Text, Button, ScrollView} from 'react-native';
import styled from 'styled-components/native';

import {
    createStackNavigator,
    StackHeaderLeftButtonProps,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MyAreaCommBox from '~/Components/MyAreaCommBox';

const Stack = createStackNavigator();


const HeaderButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    width: 120px;
`;

const MyCommTitleBox = styled.View`
    background-color: #fef5a9;
    height: 60px;
    justify-content: space-evenly;
`;

const MyCommTitle = styled.Text`
    font-size: 20px;
    margin-left: 20px;
`;


var datas = [{id: 1, name: `우쿨룰루랄라`, mainImg: `ins.png`, desc: `우쿨렐레 연습 인증 / 우쿨렐레와 떠나는 찬양 여행`, area: `안양`, category: [`음악/악기`, `작곡`, `여행`], numMember: 10}]
var data = {id: 1, name: `우쿨룰루랄라`, mainImg: `ins.png`, desc: `우쿨렐레 연습 인증 / 우쿨렐레와 떠나는 찬양 여행`, area: `안양`, category: [`음악/악기`, `작곡`, `여행`], numMember: 10};


const NoniMain = () => {
    return (
        <ScrollView>
            <MyCommTitleBox><MyCommTitle>내 지역 공동체</MyCommTitle></MyCommTitleBox>
                <MyAreaCommBox data={data}></MyAreaCommBox>
            <MyCommTitleBox><MyCommTitle>내 광역 공동체</MyCommTitle></MyCommTitleBox>
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
                            <Icon name="search" size={26} onPress={() => alert('This is a search button!')}/>
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
        <NoniNavi />
        // <Icon name="search" size={26} />
    );
  };
  
  
  export default Noni;