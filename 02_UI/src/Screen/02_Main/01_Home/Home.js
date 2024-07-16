import React, {useContext, useEffect, useState} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent, Alert } from 'react-native';
import styled from 'styled-components/native';
import AddBtn from '~/Components/AddBtn'
import { UserData } from '~/Context/User';
import {NativeModules, Button} from 'react-native';
import { getUniqueId, getManufacturer, isEmulator } from 'react-native-device-info';
import PlusBtn from '~/Components/PlusBtn';
import SearchChurchPage from '~/Screen/02_Main/03_Church/SearchChurchPage';
import ChurchView from '~/Screen/02_Main/04_Profile/ChurchView'
import {createStackNavigator} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DomainContext } from '~/Context/Domain';
const Stack = createStackNavigator();

const InfoTextBold = styled.Text`
    font-size: 20px;
    font-family: 'DoHyeon-Regular';   
    margin-top: 5px;
    margin-bottom: 5px;
    height: 30px;
`;

const UserCardSquare = ({member}) => {
    const domain = useContext(DomainContext);

    useEffect(() => {
        console.log("UserCardSquare")
        console.log(member);
    })

    return (
        <TouchableOpacity style={{alignItems: 'center', margin: 2}} onPress={() => {alert("사람")}}>
            <Image style={{backgroundColor: 'transparent', width: 70, height: 70, margin: 2, borderRadius: 20, borderColor: 'black',  borderWidth: 2}} source={{uri: `${domain}/Profile/${member.photo}` + "?cache="+Math.random()}}/>
            <Text>{member.name}</Text>
        </TouchableOpacity>
    )
}

const HomeMain = ({navigation}) => {
    const { CalendarModule, KakaoMapModule, DaumMapModule } = NativeModules;
    const { userData, setUserData, userChurch } = useContext(UserData);
    const domain = useContext(DomainContext);
    const [neighbors, setNeighbors] = useState([]);

    /* 반경 10 km 이내의 이웃 크리스천 불러오기. 가까운 순서로 정렬 */
    useEffect(() => {
        fetch(`${domain}/User/Neighbor/${userData.id}/${userData.location_ll.x}/${userData.location_ll.y}`).then(res => res.json()).then(res => {console.log(res); setNeighbors(res)});
    }, [userData])

    return (
        <ScrollView>
            <InfoTextBold>
                이웃 크리스천
            </InfoTextBold>
            <FlatList
                horizontal={true}
                data={neighbors}
                renderItem={({item}) => (<UserCardSquare member={item} />)}
            />
        </ScrollView>
    )
}

const HomeStackNavi = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name={'HomeMain'}
                component={HomeMain}
                options={{title: "우리동네 크리스천"}}
            />
            <Stack.Screen
                name="SearchChurchPage"
                component={SearchChurchPage}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    title: '교회 찾기',
                }}
            />
            <Stack.Screen
                name="ChurchView"
                component={ChurchView}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    title: '교회 찾기',
                }}
            />
        </Stack.Navigator>
    )
}

const Home = () => {
    return (
        <HomeStackNavi />
    )
}

export default Home;