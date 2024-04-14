import React, { useEffect, useState, useContext } from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView, Text } from 'react-native';
import Styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DomainContext} from '~/Context/Domain';
import {TabNavi} from '~/Context/Navi';
import {
    createStackNavigator,
} from '@react-navigation/stack';
import SearchChurchPage from './SearchChurchPage';
import ChurchCard from '~/Components/ChurchCard';
import AddChurchPage from './AddChurchPage';

const Stack = createStackNavigator();

const SearchArea = Styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background-color: transparent;
`;

const SearchBox = Styled.View`
    width: 90%;
    height: 50px;
    background-color: yellow;
    border: 3px solid black;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const ChurchMain = ({navigation}) => {
    const domain = useContext(DomainContext);
    const [churches, setChurches] = useState([]);

    useEffect(() => {
        fetch(`${domain}/Church`).then(res => res.json()).then(res => {setChurches(res)});
    }, [])

    return (
        <ScrollView style={{padding: 10, backgroundColor: "skyblue"}}>
            <SearchArea onPress={() => {navigation.navigate('SearchChurchPage')}}>
                <SearchBox>
                    <Text>
                        교회 이름, 지역, 목사님 성함으로 검색하세요
                    </Text>
                </SearchBox>
                <Icon name="search" size={26}/>
            </SearchArea>
            {churches.length > 0 && churches.map((data, index) => (<ChurchCard church={data}/>))}
            

        </ScrollView>
    )
}

const Church = ({navigation}) => {
    const {setTabNavi} = useContext(TabNavi);

    useEffect(() => {
        setTabNavi(navigation);
    }, [navigation]);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'ChurchMain'}
                component={ChurchMain}
            />
            <Stack.Screen 
                name={'SearchChurchPage'}
                component={SearchChurchPage}
            />
            <Stack.Screen 
                name={'AddChurchPage'}
                component={AddChurchPage}
            />
        </Stack.Navigator>
    );
};


export default Church;