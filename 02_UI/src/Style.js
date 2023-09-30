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

    default: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'DoHyeon-Regular',
    }
})

const VerticalMargin = Styled.View`
    width: 100%;
    height: 100px;
    background-color: transparent;
`;

export default Styles;
export {VerticalMargin};