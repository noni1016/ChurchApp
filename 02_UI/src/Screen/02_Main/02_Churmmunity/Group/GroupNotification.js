import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DomainContext} from '@/Context/Domain';
import {UserData} from '@/Context/User';
import Feed from '@/Components/Feed';
import AddBtn from '@/Components/AddBtn';
import { useIsFocused } from '@react-navigation/native';

const GroupNotification = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    const club = route.params.club;
    const isLeader = route.params.isLeader;
    let [clubNotices, setClubNotices] = useState([]);
    let [reload, setReload] = useState(false);
    const {userData} = useContext(UserData);
    const isFocused = useIsFocused();

    useEffect(() => {
        navigation.setOptions({title: `공지사항`});
    }, []);

    /* 그룹의 공지사항을 불러옴 */
    useEffect(() => {
        console.log(`${domain}/Club/${club.id}/Notices`);
        fetch(`${domain}/Club/${club.id}/Notices`).then(res => res.json()).then(res => {setClubNotices(res);});
    }, [club, reload, isFocused])

    return (
        <>
            <ScrollView>
            {clubNotices.map((data, index) => (
                <Feed club={club} feed={data} key={index} onFeedChange={() => setReload(true)} navigation={navigation} />
            ))}
            </ScrollView>
            {isLeader && <AddBtn OnPressMethod={() => {navigation.navigate('EditFeed', {edit: false, isNotice: true, club: club, navigation: navigation});}}/>}
        </>
    )
}

export default GroupNotification;