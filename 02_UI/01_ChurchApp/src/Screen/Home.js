import React from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Styled from 'styled-components/native';
import AddBtn from '~/Components/AddBtn'

const Home = () => {
    return (
        <View>
            <AddBtn OnPressMethod={() => {alert('갸아아악')}}/>
        </View>
    )
}

export default Home;