import React, {useState, useEffect, createContext} from 'react';
import { useContext } from 'react/cjs/react.development';
import { ScrollView, View, Text, Image } from 'react-native';
import Styled from 'styled-components/native';
import DaumMap from '../../03_Map/DaumMapController';
import Geolocation from 'react-native-geolocation-service';
import { useIsFocused } from '@react-navigation/native';
import Styles from '~/Style';
import {DomainContext} from '~/Context/Domain';

const Input = Styled.TextInput`
background-color: yellow;
width: 60%;
border-bottom-width: 3px;
`;

const SearchBtn = Styled.TouchableOpacity`
background-color: green;
width: 40%;
border-bottom-width: 3px;
align-items: center;
`;

const AddBox = Styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    background-color: transparent;
    margin: 10px 0px 10px 0px; //상 우 하 좌
`;

const PlusText = Styled.Text`
    color: white;
    background-color: skyblue;
    width: 70px;
    height: 50px;
    font-size: 50px;
    font-family: 'DoHyeon-Regular';
    padding: 5px;
    text-align: center;
    border-radius: 10px;
    margin: 10px 0px 10px 0px; //상 우 하 좌
`;

const ChurchInfoBtn = Styled.TouchableOpacity`

width: 100%;
height: 30px;
border-bottom-width: 3px;
`;

const ChurchView = ({route, navigation})=>{
    const domain = useContext(DomainContext);
   
    useEffect(() => {
    },[])

    return (
        <>
            <ScrollView>
                <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                    {console.log(route)}
                    <Text style={Styles.default}>교회를 검색하세요.</Text>
                    <Text style={Styles.default}>교회를 검색하세요.</Text>
                </View>
            </ScrollView>
        </>
    )
}


export default ChurchView;