import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent, Alert } from 'react-native';
import Styled from 'styled-components/native';
import Feed from './Feed';
import {DomainContext} from '~/Context/Domain';

const Temp = Styled.View`
    height: 300px;

`;


const Feeds = ({groupId, feedAdded, navigation}) => {
    const domain = useContext(DomainContext);
    let [groupFeeds, SetGroupFeeds] = useState([]);
    let [reload, SetReload] = useState(false);

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
        alert('on change in');
    }, [groupId, reload, feedAdded])

    return (
        <>
            {groupFeeds.map((feed, index) => (
                <Feed feed={feed} key={index} onFeedChange={() => SetReload(true)} navigation={navigation}/>
            ))}
            <Temp />            
        </>
    )
}

export default Feeds;