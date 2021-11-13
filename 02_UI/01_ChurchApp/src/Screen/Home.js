import React from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Styled from 'styled-components/native';
import AddBtn from '~/Components/AddBtn'

const data = {id: 5};

const Home = () => {
    return (
        <View>
            <AddBtn OnPressMethod={() => {alert('AddBtn')}}/>
        </View>
    )
}

export default Home;