import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import Feed from '~/Components/Feed';
import AddBtn from '~/Components/AddBtn';

const GroupNotification = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    const club = route.params.club;
    const isLeader = route.params.isLeader;
    let [clubNotices, setClubNotices] = useState([]);
    let [reload, setReload] = useState(false);
    const {userData} = useContext(UserData);

    useEffect(() => {
        navigation.setOptions({title: `공지사항`});
    }, []);

    /* 그룹의 공지사항을 불러옴 */
    useEffect(() => {
        console.log(`${domain}/Club/${club.id}/Notices`);
        fetch(`${domain}/Club/${club.id}/Notices`).then(res => res.json()).then(res => {setClubNotices(res);});
    }, [club, reload])

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