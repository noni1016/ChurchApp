import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled, {css} from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Container = styled.TouchableOpacity`
    height: 70px;
    flex-direction: row;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    ${props => props.isLeader &&
        css`
            border: 2px solid skyblue;
        `}
`;

const NameCont = styled.View`
    margin: 10px 10px 5px 10px; //상 우 하 좌
`;

const Name = styled.Text`    
    font-size: 20px;
    font-family: 'DoHyeon-Regular';  
    color: black;  
`;

const GroupMemProfile = ({member, onPress, isLeader}) => {

    const domain = useContext(DomainContext);
    var [url, setUrl] = useState('');

    useEffect(() => {        
        setUrl(`${domain}/Profile/${member.photo}`);
    }, [])

    return (
        <Container onPress={onPress} isLeader={isLeader}>
            <Image style={{ backgroundColor: 'transparent', width: 70, height: 70, resizeMode: 'contain' }} source={url ? {uri: url } : null} />
            <NameCont>
                <Name>{member.name}</Name>
            </NameCont>
            {isLeader && <FontAwesome5 name="crown" color={'skyblue'} size={20} />}
        </Container>
    )
}

export default GroupMemProfile;