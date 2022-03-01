import React, {useContext, useEffect} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Styled from 'styled-components/native';
import AddBtn from '~/Components/AddBtn'
import { AuthContext, UserContextProvider } from '~/Context/User';

const data = {id: 5};

const Home = () => {

    return (
        <View>
            {/* <AddBtn OnPressMethod={() => {alert('AddBtn')}}/> */}
            <Image source={require(`~/Assets/Images/bakery.jpg`)}/>
        </View>
    )
}

export default Home;