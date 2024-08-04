import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import Feed from '~/Components/Feed';
import AddBtn from '~/Components/AddBtn';
import { useIsFocused } from '@react-navigation/native';

const GroupNotification = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    const group = route.params.group;
    const groupType = route.params.groupType;
    const isLeader = route.params.isLeader;
    const isMember = route.params.isMember;
    let [groupNotices, setGroupNotices] = useState([]);
    let [reload, setReload] = useState(false);
    const {userData} = useContext(UserData);
    const isFocused = useIsFocused();

    useEffect(() => {
        navigation.setOptions({title: `공지사항`});
    }, []);

    /* 그룹의 공지사항을 불러옴 */
    useEffect(() => {
        console.log(`${domain}/${groupType}/${group.id}/Notices`);
        fetch(`${domain}/${groupType}/${group.id}/Notices`).then(res => res.json()).then(res => {setGroupNotices(res);});
    }, [group, reload, isFocused])

    return (
        <>
            <ScrollView>
            {groupNotices.map((data, index) => (
                <Feed groupType={groupType} group={group} feed={data} key={index} reload={reload} setReload={setReload} isMember={isMember} onFeedChange={() => setReload(true)} navigation={navigation} />
            ))}
            </ScrollView>
            {isLeader && <AddBtn OnPressMethod={() => {navigation.navigate('EditFeed', {edit: false, groupType: groupType, group: group, reload: reload, setReload: setReload, isNotice: true, navigation: navigation});}}/>}
        </>
    )
}

export default GroupNotification;