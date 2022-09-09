import React, { useState, useEffect } from 'react';
import {View,Text, ActivityIndicator, ScrollView, Button} from 'react-native';
import Styled from 'styled-components/native';
import ClubCard from '~/Components/ClubCard';
import TagBox from '~/Components/TagBox';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';

const Header = Styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

const SearchBar = Styled.TextInput`
    flex: 8;
    background-color: transparent;
    padding: 0px;
    margin: 10px 10px 10px 20px; 
    border: 1px;
    font-size: 18px;
`;

const Title = Styled.Text`
    color: black;
    font-size: 30px;
    font-family: 'DoHyeon-Regular';
    margin-bottom: 10px;
    width: 100%;
`;

const Separator = Styled.View`
    margin-vertical: 20px;
`;

const KeywordView = Styled.View`
    width: 90%;
    flex-direction: row;
    flex-wrap: wrap;
    background-color : transparent;
    margin: 0px 10px 20px 10px; //상 우 하 좌
`;




const tempClubs = [
    { id: 0, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 },
    { id: 1, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 },
    { id: 2, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 },
    { id: 3, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 },
    { id: 3, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 },
    { id: 3, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 },
    { id: 3, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 },
];

const tempSearchHistory = ['이거', '저거', '으아'];

const SearchGroups = ({route, navigation}) => {

    const [clubs, setClubs] = useState(tempClubs);
    const [showingClubs, SetShowingClubs] = useState(tempClubs);

    /* 검색 메인 창에는 상위 두 개의 결과만 표시 */
    useEffect(() => {
        if (clubs && clubs.length > 2) {
            SetShowingClubs(clubs.slice(0,2));
        } else {
            SetShowingClubs(clubs);
        }
    }, [clubs])    



    return (
        <ScrollView>
            <View style={{ alignItems: 'center' }}>
                <Header>
                    <Icon name="arrow-back" size={26} flex={1} onPress={() => navigation.goBack()} />
                    <SearchBar placeholder='공동체, 번개 모임 검색' onSubmitEditing={() => alert('Search!')} />
                    <Icon2 name="filter-alt" size={26} flex={2} onPress={() => alert('Filter!')} />
                    <Icon2 name="search" size={26} flex={2} onPress={() => alert('Search!')} />
                </Header>
                
                {clubs == null && 
                <KeywordView>
                    {tempSearchHistory ? tempSearchHistory.map((v, i) => <TagBox key={i} text={v} color="blue" onPressDelBtn={() => setContent((current) => {let newContent = {...current}; newContent.keyword.splice(i, 1); return newContent})}/>) : null}
                </KeywordView>}

                {clubs && <>
                
                    <Title>공동체 {clubs.length} 개</Title>

                    {showingClubs.map((v, i) => (
                        <>
                            <ClubCard club={v} style={{ marginBottom: '10px' }} />
                            <View style={{ height: 20, width: '100%', backgroundColor: 'transparent' }} />
                        </>))}

                    <View style={{ width: "90%" }}>
                        <Button title="더 보기" onPress={() => { navigation.navigate('ShowMoreClubs', { title: `공동체 검색 결과 ${clubs.length} 개`, clubs: clubs, navigation: navigation }); }} />
                    </View>
                </>
                }
                <Separator />

                {clubs && <><Title>번개 {clubs ? clubs.length : 0} 개</Title>
                <View style={{ width: "90%" }}>
                    <Button title="더 보기" onPress={() => alert('번개 모임 더보기')} />
                </View>
                </>}
            </View>
        </ScrollView>
    );
};

export default SearchGroups;