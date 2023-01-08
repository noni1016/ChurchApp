import React from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Styled from 'styled-components/native';



const Container = Styled.TouchableOpacity`
    position: absolute;
    right: 20px;    
    bottom: 10px;
    width: 50px;
    height: 50px;
    background-color: skyblue;
    color: white;
    border-radius: 50px;
    border-color: white;
    font-size: 30px;
    font-weight: bold;

    justify-content: center;
    align-items: center;
`;

const PlusMark = Styled.Text`
    font-size: 30px;
    color: white;
`;

const AddBtn = ({OnPressMethod}) => {
    console.log(Dimensions.get('window').height);
    return (
        <Container onPress={OnPressMethod} >
            <PlusMark>+</PlusMark>
        </Container>
    )
}

export default AddBtn;