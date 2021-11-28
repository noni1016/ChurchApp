import React from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Styled from 'styled-components/native';



const Container = Styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    top: ${Dimensions.get('window').height - 120}px;
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

// const Container = Styled.View`
//     position: absolute;
//     right: 30px;
//     top: ${Dimensions.get('window').height - 100}px;
// `;

const PlusMark = Styled.Text`
    font-size: 30px;
    color: white;
`;


const AddBtn = ({OnPressMethod}) => {
    return (
        <Container onPress={OnPressMethod} >
            <PlusMark>+</PlusMark>
        </Container>
    )
}

export default AddBtn;