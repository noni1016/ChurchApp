import React, {useState, useEffect, useContext} from 'react';
import {Text, View} from 'react-native';
import Styled from 'styled-components/native';
import DaumMap from '~/Screen/03_Map/DaumMapController';
import { useIsFocused } from '@react-navigation/native';
import {UserData} from '~/Context/User';
import GroupMemProfile from './GroupMemProfile';
import { TabNavi } from '~/Context/Navi';
import Icon from 'react-native-vector-icons/Ionicons';

const Container = Styled.View`
    padding: 10px 10px 0px 10px; //상 우 하 좌
`;

const Title = Styled.Text`
    height: 30px;
    color: black;
    font-size: 25px;
    font-family: 'DoHyeon-Regular';    
`;

const Desc = Styled.Text`
    font-size: 20px;
`;

const Divider = Styled.View`
    padding: 10px;
    margin: 5px 0px 20px 0px;
    border-bottom-width: 2px;
`;

const NumGroupMemCont = Styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    border-color: #000000;
    border-bottom-width: 1px;    
    border-top-width: 1px;
    padding: 3px 0px 3px 10px; //상 우 하 좌
    /* margin: 1px 1px 20px 1px; */
`;

const Padding = Styled.View`
    height: 10px;
`;

const SpotMembersView = ({data, members, isLeader, stackNavi}) => {
    const {userData} = useContext(UserData);
    const {tabNavi} = useContext(TabNavi);
    const [ShowingComponent, setShowingComponent] = useState(<View/>);

    useEffect(() => {
        console.log(stackNavi);
            setShowingComponent(
                <>
                    <NumGroupMemCont>
                        <Text style={{color: "black"}} fontSize={30}>멤버 {members.length} 명</Text>
                        {isLeader && <Icon name="settings-outline" size={18} onPress={() => stackNavi.navigate('EditMembers', { group: data, members: members, navigation: stackNavi })} />}
                    </NumGroupMemCont>
                    {/* <Divider/> */}
                    <Padding/>
                    {members.map((member, index) => (<GroupMemProfile key={index.toString()} member={member} isLeader={member.id == data.leader} onPress={() => {
                        if (member.id == userData.id) tabNavi.navigate('Profile', { member: member });
                        else stackNavi.navigate('Profile', { member: member });
                    }} />))}
                </>
            )
    }, [])

    return (
        <Container>
            <View style={{height: 10}}/>
            {ShowingComponent}
        </Container>
    )
};

export default SpotMembersView;