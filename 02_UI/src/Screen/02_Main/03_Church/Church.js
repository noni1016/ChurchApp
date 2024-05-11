import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TabNavi} from '~/Context/Navi';
import {
    createStackNavigator,
} from '@react-navigation/stack';
import SearchChurchPage from './SearchChurchPage';
import ChurchCard from '~/Components/ChurchCard';
import AddChurchPage from './AddChurchPage';
import ChurchPage from './ChurchPage';
import EditFeed from '~/Screen/02_Main/02_Churmmunity/Group/EditFeed';

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

const InfoTextBold = Styled.Text`
    font-size: 20px;
    font-family: 'DoHyeon-Regular';   
    margin-top: 5px;
    margin-bottom: 5px;
    height: 30px;
`;

const ChurchMain = ({navigation}) => {
    const domain = useContext(DomainContext);
    const {userChurch} = useContext(UserData);
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
            <View>
                <InfoTextBold>내가 활동 중인 교회</InfoTextBold>
                {userChurch.length > 0 && userChurch.map((data, index) => (<ChurchCard key={index} church={data} navigation={navigation}/>))}
            </View>

            <View>
                <InfoTextBold>모든 교회</InfoTextBold>
                {churches.length > 0 && churches.map((data, index) => (<ChurchCard key={index} church={data} navigation={navigation}/>))}
            </View>

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
            <Stack.Screen
                name={'ChurchPage'}
                component={ChurchPage}
            />
            <Stack.Screen
                name={'EditFeed'}
                component={EditFeed}
            />
        </Stack.Navigator>
    );
};


export default Church;