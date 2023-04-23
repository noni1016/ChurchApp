import React, {useState, useEffect, useContext, createRef} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, TouchableOpacity, Alert} from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import ImageSize from 'react-native-image-size';

const PhotoBox = Styled.View`
    width: ${Dimensions.get('window').width / 3}px;
    height: ${Dimensions.get('window').width / 3}px;
    background-color: transparent;
`;

const Photo = ({img}) => {

    console.log(img);

    return (
        <PhotoBox>
            <Image style={{ backgroundColor: 'transparent', width: Dimensions.get('window').width / 3, height: Dimensions.get('window').width / 3, resizeMode: 'cover'}} source={img ? {uri: img} : null } />
        </PhotoBox>
    )

}
export default Photo;