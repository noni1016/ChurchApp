import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent, Alert } from 'react-native';
import Styled from 'styled-components/native';
import Feed from './Feed';
import {DomainContext} from '~/Context/Domain';
import { useIsFocused } from '@react-navigation/native';

const Temp = Styled.View`
    height: 300px;
`;


const Feeds = ({club, feedAdded, reload, setReload, navigation}) => {
    const domain = useContext(DomainContext);
    let [clubFeeds, setClubFeeds] = useState([]);
    const isFocused = useIsFocused();

    /* 그룹의 Feed 들을 불러옴 */
    useEffect(() => {
        console.log(`${domain}/Club/${club.id}/Feeds`);
        fetch(`${domain}/Club/${club.id}/Feeds`).then(res => res.json()).then(res => {setClubFeeds(res);});   
    }, [club, reload, feedAdded, isFocused])


    return (
        <>
            {clubFeeds.map((feed, index) => (
                <Feed groupType={'Club'} group={club} feed={feed} key={index} onFeedChange={() => setReload(!reload)} navigation={navigation}/>
            ))}
            {/* <Temp />             */}
        </>
    )
}

export default Feeds;