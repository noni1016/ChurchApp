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
width: 30%;
height: 30px;
border-bottom-width: 3px;
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

const SearchChurchPage = ({route, navigation})=>{
    let [serchChurch, setSerchChurch] = useState("교회 이름");
    const domain = useContext(DomainContext);
   
    useEffect(() => {

    },[])

    return (
        <>
            <ScrollView>
            <Input
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={serchChurch}
                    returnKeyType="done"
                    onChangeText={(value) => {
                        console.log(value);
                        serchChurch = setSerchChurch(value);
                    }}
                    style={Styles.default}
                />

                <SearchBtn onPress={
                    () => {
                        console.log(`${domain}/Find/Church/${serchChurch}`);
                        fetch(`${domain}/Church/Find/${serchChurch}`).then(res => {
                            res.json()
                            console.log(res)
                            }).then(res => console.log(res.json()));//res => setMembers(res));
                    }
                } height = "30%">
                    <Text> Search Locate </Text>
                </SearchBtn>

                <AddBox onPress={() => {{navigation.navigate('AddChurchPage')}}}>
                    <PlusText>+</PlusText>
                    <Text style={Styles.default}>교회 추가</Text>
                </AddBox>

            </ScrollView>
        </>
    )
}


export default SearchChurchPage;