import React, {useState, useEffect, useContext} from 'react';
import { View, Text } from 'react-native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import {
    createStackNavigator,
} from '@react-navigation/stack';

const tempUser = {id: 4, name: "짱쎄", photo: 'Profile/짱쎄.jpg', role: 'user'};
const Stack = createStackNavigator();

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
            navigation.setOptions({title: member.name});
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