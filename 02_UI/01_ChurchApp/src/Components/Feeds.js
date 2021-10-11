import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';
import Feed from './Feed';
import {DomainContext} from '~/Context/Domain';

const Feeds = ({groupId}) => {
    const domain = useContext(DomainContext);
    let [groupFeeds, SetGroupFeeds] = useState();

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
    })

    return (
        <Feed/>
    )
}

export default Feeds;