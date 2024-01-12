import React from 'react';
import {StyleSheet} from 'react-native';
import Styled from 'styled-components/native';

const Styles = StyleSheet.create({
    header: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'DoHyeon-Regular',
    },

    text: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'DoHyeon-Regular',
    }, 

    default: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'DoHyeon-Regular',
        height: 25
    }
})

const VerticalMargin = Styled.View`
    width: 100%;
    height: 100px;
    background-color: transparent;
`;

const DefaultText = Styled.Text`
    font-size: 20px;
    font-family: 'DoHyeon-Regular';
    color: 'black';
`;

export default Styles;
export {VerticalMargin, DefaultText};