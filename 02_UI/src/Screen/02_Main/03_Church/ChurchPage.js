import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/Domain';

const ChurchPage = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    const {userData} = useContext(UserData);
    const data = route.params.group;
    const [tabIdx, setTabIdx] = useState(0);
    const [members, setMembers] = useState([]);
    const [isMember, setIsMember] = useState([]);
    const tabs = ['홈', '게시글']
    
    return (<Text>ChurchPage</Text>)
}

export default ChurchPage;