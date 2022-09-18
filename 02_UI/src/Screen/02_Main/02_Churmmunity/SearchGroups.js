import React, { useState, useEffect, useContext } from 'react';
import {View,Text, ActivityIndicator, ScrollView, Button, TouchableOpacity} from 'react-native';
import Styled from 'styled-components/native';
import { useForm, Controller } from "react-hook-form";
import ClubCard from '~/Components/ClubCard';
import TagBox from '~/Components/TagBox';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';

import { UserData, UserContextProvider } from '~/Context/User';
import {DomainContext, DomainContextProvider} from '~/Context/Domain';

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
    const [showingClubs, SetShowingClubs] = useState();
    const { control, handleSubmit } = useForm();

    /* 검색 메인 창에는 상위 두 개의 결과만 표시 */
    useEffect(() => {
        if (clubs && clubs.length > 2) {
            SetShowingClubs(clubs.slice(0,2));
        } else {
            SetShowingClubs(clubs);
        }   
    }, [clubs])    

    /* 서버에서 검색 데이터 받아오기 */
    const getSearchResult = (data) => {
        fetch(`${domain}/Group/Search/${data.search}/127/37`)
        .then(res => res.json())
        .then(res => {console.log(res); setClubs(res)});
    }



    return (
        <ScrollView>
            <View style={{ alignItems: 'center' }}>
                <Header>

                    <Icon name="arrow-back" size={26} flex={1} onPress={() => navigation.goBack()} />
                    <Controller
                        control={control}
                        rules={{required: true, minLength: 2}}
                        name="search"
                        defaultValue={""}
                        render={({ field: {onChange, value}}) => (
                            <SearchBar placeholder='공동체, 번개 모임 검색' onChangeText={onChange} value={value} onSubmitEditing={handleSubmit(getSearchResult)} />
                        )}
                    />
                    <Icon2 name="filter-alt" size={26} flex={2} onPress={() => alert('Filter!')} />
                    <Icon2 name="search" size={26} flex={2} onPress={handleSubmit(getSearchResult)} />
                </Header>
                
                {/* {clubs == null && 
                <KeywordView>
                    {tempSearchHistory ? tempSearchHistory.map((v, i) => <TagBox key={i} text={v} color="blue" onPressDelBtn={() => setContent((current) => {let newContent = {...current}; newContent.keyword.splice(i, 1); return newContent})}/>) : null}
                </KeywordView>} */}

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

                {showingClubs && <><Title>번개 {clubs ? clubs.length : 0} 개</Title>
                <View style={{ width: "90%" }}>
                    <Button title="더 보기" onPress={() => alert('번개 모임 더보기')} />
                </View>
                </>}
            </View>
        </ScrollView>
    );
};

export default SearchGroups;