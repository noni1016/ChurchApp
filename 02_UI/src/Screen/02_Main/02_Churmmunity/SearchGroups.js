import React, { useState, useEffect, useContext } from 'react';
import {View,Text, ActivityIndicator, ScrollView, Button, TouchableOpacity} from 'react-native';
import Styled from 'styled-components/native';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import ClubCard from '~/Components/ClubCard';
import SpotCard from '~/Components/SpotCard';
import TagBox from '~/Components/TagBox';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

import { UserData, UserContextProvider } from '~/Context/User';
import {DomainContext, DomainContextProvider} from '~/Context/Domain';
import UserDataStorage from '~/Context/UserDataStorage';

/*
    Ref : https://react-hook-form.com/api/useform/register#options
*/

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


// const tempSearchHistory = ['이거', '저거', '으아'];

const SearchGroups = ({route, navigation}) => {

    const domain = useContext(DomainContext);

    const [clubs, setClubs] = useState();
    const [spots, setSpots] = useState();
    const [showingClubs, setShowingClubs] = useState();
    const [showingSpots, setShowingSpots] = useState();
    const [searchHistory, setSearchHistory] = useState([]);
    const { control, handleSubmit, register, setValue } = useForm();

    /* 페이지 로드할때 기기에 저장된 검색어 이력 가져옴 */
    useEffect(() => {
        UserDataStorage.get('searchHistory').then(setSearchHistory);
        // AsyncStorage.getItem('searchHistory', (err, res) => {
        //     console.log(res);
        //     if (res) setSearchHistory(JSON.parse(res));
        // });
    }, [])

    /* 검색 메인 창에는 상위 두 개의 결과만 표시 */
    useEffect(() => {
        if (clubs && clubs.length > 2) {
            setShowingClubs(clubs.slice(0,2));
        } else {
            setShowingClubs(clubs);
        }   
    }, [clubs])   
    
    useEffect(() => {
        if (spots && spots.length > 2) {
            setShowingSpots(spots.slice(0,2));
        } else {
            setShowingSpots(spots);
        }   
    }, [spots])   

    /* 서버에서 검색 데이터 받아오기 */
    const getSearchResult = (data) => {
        fetch(`${domain}/Group/Search/Club/${data.search}/127/37`)
        .then(res => res.json())
        .then(res => {console.log(res); setClubs(res)});

        fetch(`${domain}/Group/Search/Spot/${data.search}/127/37`)
        .then(res => res.json())
        .then(res => {console.log(res); setSpots(res)});

        // 검색어 히스토리로 저장
        // 이전에 검색한 기록이 있으면 지우고 최상위에 넣기
        // 길이가 길면 가장 과거값 삭제
        let find = -1;
        for (let i = 0; i < searchHistory.length; i++)
        {
            if (searchHistory[i] == data.search)
            {
                find = i;
                break;
            }
        }

        if (find != -1)
        {
            searchHistory.splice(find, 1);
        }

        searchHistory.push(data.search);

        if (searchHistory.length > 20)
        {
            searchHistory.shift();
        }

        UserDataStorage.set('searchHistory', searchHistory);
        // AsyncStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }



    return (
        <ScrollView>
            <View style={{ alignItems: 'center' }}>
                <Header>

                    <Icon name="arrow-back" size={26} flex={1} onPress={() => navigation.goBack()} />
                    <Controller
                        control={control}
                        rules={{required: true, minLength: 1}}
                        name="search"
                        defaultValue={""}
                        render={({ field: {onChange, value}}) => (
                            <SearchBar placeholder='공동체, 번개 모임 검색' onChangeText={onChange} value={value} onSubmitEditing={handleSubmit(getSearchResult)} />
                        )}
                        {...register("search")}
                    />
                    <Icon2 name="filter-alt" size={26} flex={2} onPress={() => alert('Filter!')} />
                    <Icon2 name="search" size={26} flex={2} onPress={handleSubmit(getSearchResult)} />
                </Header>
                
                {clubs == null &&
                <KeywordView>
                    {searchHistory ? searchHistory.slice(0).reverse().map((v, i) => 
                        <TagBox key={i} text={v} color="blue" 
                            onPressDelBtn={() => setSearchHistory((current) => {let newItem = [...current]; newItem.splice(newItem.length - i - 1, 1); return newItem})}
                            onPressText={() => setValue("search", v)}
                            />) : null
                        }
                </KeywordView>}

                {showingClubs && <>
                
                    <Title>공동체 {clubs.length} 개</Title>

                    {showingClubs.map((v, i) => (
                        <TouchableOpacity onPress = {() => {
                            navigation.navigate('ClubPage', {club : v, navigation: navigation});
                        }}>
                            <ClubCard club={v} style={{ marginBottom: '10px' }} />
                            <View style={{ height: 20, width: '100%', backgroundColor: 'transparent' }} />
                        </TouchableOpacity>))}

                    <View style={{ width: "90%" }}>
                        <Button title="더 보기" onPress={() => { navigation.navigate('ShowMoreClubs', { title: `공동체 검색 결과 ${clubs.length} 개`, clubs: clubs, navigation: navigation }); }} />
                    </View>
                </>
                }
                <Separator />

                {showingSpots && <><Title>번개 {spots ? spots.length : 0} 개</Title>

                {showingSpots.map((v, i) => (
                        <TouchableOpacity onPress = {() => {
                            navigation.navigate('SpotPage', {spot : v, navigation: navigation});
                        }}>
                            <SpotCard spot={v} style={{ marginBottom: '10px' }} />
                            <View style={{ height: 20, width: '100%', backgroundColor: 'transparent' }} />
                        </TouchableOpacity>))}
                <View style={{ width: "90%" }}>
                    <Button title="더 보기" onPress={() => { navigation.navigate('ShowMoreSpots', { title: `번개 검색 결과 ${spots.length} 개`, spots: spots, navigation: navigation }); }} />
                </View>
                </>}
            </View>
        </ScrollView>
    );
};

export default SearchGroups;