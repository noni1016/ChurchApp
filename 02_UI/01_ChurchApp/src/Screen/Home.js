import React, {useContext, useEffect} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Styled from 'styled-components/native';
import AddBtn from '~/Components/AddBtn'
import { UserContext, AuthContext, UserContextProvider } from '~/Context/User';

const data = {id: 5};

const Home = () => {
    // const [varA] = useContext({AuthContext});
    const {varA, setVarA} = useContext(AuthContext);

    useEffect(() => {
        console.log('authr' + varA);
    });

    return (
        <UserContextProvider>
        <View>
            {/* <AddBtn OnPressMethod={() => {alert('AddBtn')}}/> */}
            <Image source={require(`~/Assets/Images/bakery.jpg`)}/>
        </View>
        </UserContextProvider>
    )
}

export default Home;