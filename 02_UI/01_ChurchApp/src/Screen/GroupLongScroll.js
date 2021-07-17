import React, {useState, useEffect, useContext} from 'react';
import { Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';
import {DataContext} from '~/Context/Data';

const GroupLongScroll = () => {

    const {myGroupDatas} = useContext(DataContext)

    return (
        // <Text>{myGroupDatas[0].name}</Text>
        <Text>GroupLongScroll</Text>
    )
};

export default GroupLongScroll;