import React, { useState, useEffect } from 'react';
import {View,Text} from 'react-native';
import Styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

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


const SearchGroups = ({route, navigation}) => {

    

    return (
        <Header>
            <Icon name="arrow-back" size={26} flex={1} onPress={() => navigation.goBack()} />
            <SearchBar />
            <Icon2 name="search" size={26} flex={2} onPress={() => alert('Search!')} />
        </Header>
    );
};

export default SearchGroups;