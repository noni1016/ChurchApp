import React, {useState, useEffect, useContext} from 'react';
import {Text, View} from 'react-native';
import Styled from 'styled-components/native';
import DaumMap from '~/Screen/03_Map/DaumMapController';
import { useIsFocused } from '@react-navigation/native';
import {UserData} from '~/Context/User';
import GroupMemProfile from './GroupMemProfile';
import { TabNavi } from '~/Context/Navi';

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

const SpotMembersView = ({members, isLeader, stackNavi}) => {
    const {userData} = useContext(UserData);
    const {tabNavi} = useContext(TabNavi);
    const [ShowingComponent, setShowingComponent] = useState(<View/>);

    useEffect(() => {
        if (isLeader) {
            setShowingComponent(<GroupMemProfile member={userData} />)
        } 
        else {
            setShowingComponent(
                <>
                    {members.map((member, index) => (<GroupMemProfile key={index.toString()} member={member} onPress={() => {
                        if (member.id == userData.id) tabNavi.navigate('Profile', { member: member });
                        else stackNavi.navigate('Profile', { member: member });
                    }} />))}
                </>
            )
        }
    }, [])

    return (
        <Container>
            <View style={{height: 10}}/>
            {ShowingComponent}
        </Container>
    )
};

export default SpotMembersView;