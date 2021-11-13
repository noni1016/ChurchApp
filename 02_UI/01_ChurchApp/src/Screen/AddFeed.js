import React from 'react';
import { View, Text, Dimensions, ScrollView, Image} from 'react-native';
import Styled from 'styled-components/native';

const Container = Styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const GroupNameBox = Styled.View`
    justify-content: center;
    align-items: flex-start;
    background-color: blue;
    width: 90%;
    height: 50px;    
    padding: 0px 0px 0px 10px; //상 우 하 좌
`;

const GroupTitle = Styled.Text`
    color: white;
    font-size: 25px;
    font-family: 'DoHyeon-Regular';
    /* align-items: flex-start; */
    text-align: left;
    /* background-color: #0000FF; */
`;

const PlusBtnBox = Styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 300px;
    margin: 10px 0px 0px 0px; //상 우 하 좌
    background-color: transparent;
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
`;

const EditFeed = ({route, navigation}) => {
    const data = route.params.groupData;

    return (
        <Container>
            <GroupNameBox><GroupTitle>{data.name}</GroupTitle></GroupNameBox>
            <PlusBtnBox><PlusText>+</PlusText></PlusBtnBox>
            <Text>{data.name}</Text>
        </Container>
    )
}

export default EditFeed;