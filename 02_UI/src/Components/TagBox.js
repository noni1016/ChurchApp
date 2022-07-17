import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import Styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';

const MainBox = Styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    border-width: 2px;
    margin: 2px;
    padding: 2px;
`;

const TagBox = ({text, color, onPressDelBtn}) => {
    
    return (
        <MainBox style={{color: color, borderColor: color}}>
            <Text style={{color : color, fontFamily: 'DoHyeon-Regular'}}>{text}</Text>
            <Icon name="cross" size={20} onPress={() => onPressDelBtn()} />
        </MainBox>
    )
};

export default TagBox;