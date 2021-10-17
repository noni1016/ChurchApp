import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Styled from 'styled-components/native';
import Feed from './Feed';
import {DomainContext} from '~/Context/Domain';

const Temp = Styled.View`
    height: 300px;

`;
const Feeds = ({groupId}) => {
    const domain = useContext(DomainContext);
    let [groupFeeds, SetGroupFeeds] = useState([]);

    // 그룹의 Feed 들을 불러옴
    useEffect(() => {
        fetch(domain + '/Churmmunity/GetGroupFeeds', {
            method: 'POST',
            body: JSON.stringify({groupId : groupId}),
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {SetGroupFeeds(res);});
    },[])

    return (
        // <Feed/>
        <View>
            {groupFeeds.map((feed, index) => (
                <Feed feed={feed} key={index}/>
            ))}
            <Temp />
        </View>
    )
}

export default Feeds;