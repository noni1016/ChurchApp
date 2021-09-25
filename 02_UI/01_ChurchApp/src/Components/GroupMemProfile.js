import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';

const Container = styled.TouchableOpacity`
    height: 70px;
    flex-direction: row;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    // background-color: blue;
`;

const NameCont = styled.View`
    margin: 10px 10px 5px 10px; //상 우 하 좌
`;

const Name = styled.Text`    
    font-size: 20px;
    font-family: 'DoHyeon-Regular';    
`;

const GroupMemProfile = ({member}) => {

    const domain = useContext(DomainContext);
    var [url, setUrl] = useState('');

    useEffect(() => {        
        setUrl(`${domain}/${member.photo}`);
    }, [])

    return (
        <Container>
            <Image style={{ backgroundColor: 'transparent', width: 70, height: 70, resizeMode: 'contain' }} source={{ uri: url }} />
            <NameCont>
                <Name>{member.name}</Name>
            </NameCont>
        </Container>
    )
}

export default GroupMemProfile;