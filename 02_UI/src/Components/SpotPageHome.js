import React, {useState, useEffect, useContext} from 'react';
import {Text, View} from 'react-native';
import Styled from 'styled-components/native';
import DaumMap from '~/Screen/03_Map/DaumMapController';
import { useIsFocused } from '@react-navigation/native';
import {UserData} from '~/Context/User';
import GroupMemProfile from './GroupMemProfile';

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

const SpotPageHome = ({data, members,isLeader, stackNavi}) => {
    const isFocused = useIsFocused();
    const {userData} = useContext(UserData);

    return (
        <Container>
            <Title>{data.name}</Title>
            <Desc>{data.description}</Desc>
            <Divider />
            <Title>번개 예보</Title>
            <Desc>{data.time}</Desc>
            <Desc>{data.location}</Desc>
            {isFocused && data.location_ll && <DaumMap currentRegion={{
                    latitude: parseFloat(data.location_ll.y),
                    longitude: parseFloat(data.location_ll.x),
                    zoomLevel: 5,
                }}

                mapType={"Standard"}
                style={{ width: 400, height: 400, backgroundColor: 'transparent' }}
                
                markers={[{
                    latitude: parseFloat(data.location_ll.y),
                    longitude: parseFloat(data.location_ll.x),
                    pinColor: "red",
                    pinColorSelect: "yellow",
                    title: "marker test",
                    draggable: false,
                }]}
                
                /> }
                <Divider />
                <Title>리더</Title>
                <View style={{height: 15}}/>
                <GroupMemProfile member={userData} />
        </Container>
    )
};

export default SpotPageHome;