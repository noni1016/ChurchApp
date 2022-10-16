import React, {useState, useEffect, useContext} from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import {
    createStackNavigator,
} from '@react-navigation/stack';

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

const tempUser = {id: 4, name: "짱쎄", photo: 'Profile/짱쎄.jpg', role: 'user'};
const Stack = createStackNavigator();

const HeaderButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    width: 120px;
`;

const ProfileMain = ({navigation, route}) => {
    const domain = useContext(DomainContext);
    const {userData} = useContext(UserData);
    const [member, setMember] = useState(route ? route.params.member : userData);

    useEffect(() => {
        setMember(route != undefined ? route.params.member : userData);
    }, [])

    useEffect(() => {
        if (member)
        {
            navigation.setOptions({
                title: member.name,
                headerShown: true,
                headerRight: () => (
                    <HeaderButtonsContainer>
                        {userData.id != member.id && <Icon2 name="notification" size={26} onPress={() => alert('신고하기')} />}
                        <Icon2 name="message1" size={26} onPress={() => alert('채팅')} />
                        {userData.id == member.id && <Icon1 name="settings-outline" size={26} onPress={() => alert('프로필 수정')} />}
                    </HeaderButtonsContainer>
                )
            });
        }
    }, [member])

    return (
        <>
            <Text>{member.name}</Text>
        </>
    )
}

const ProfileStackNavi = ({tabNavi}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name={'ProfileMain'}
            children={({navigation}) => <ProfileMain navigation={navigation} tabNavi={tabNavi} />}        
        />

      </Stack.Navigator>  
    );
}

const Profile = ({navigation}) => {
    return (
        <ProfileStackNavi tabNavi={navigation}/>
    )
};


export {Profile as default, ProfileMain} ;