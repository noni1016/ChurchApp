import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';

const Container = styled.View`
    padding: 10px 10px 0px 10px; //상 우 하 좌
    //background-color: #ff0000;    
`;

const Title = styled.Text`
    height: 30px;
    color: black;
    font-size: 25px;
    font-family: 'DoHyeon-Regular';    
`;

const Desc = styled.Text`
    font-size: 20px;
`;

const JoinBtn = styled.TouchableOpacity`
    flex: 1;
    margin: 20px ${Dimensions.get('window').width * 0.2}px 15px ${Dimensions.get('window').width * 0.2}px; //상 우 하 좌
    padding: 10px 0px 5px 0px; //상 우 하 좌
    align-items: center;
    justify-content: center;  
    background-color: skyblue;
`;

const JoinBtnText = styled.Text`
    font-size: 25px;    
    color: white;
    font-family: 'DoHyeon-Regular'; 
`;

const NumGroupMemCont = styled.View`
    flex: 1;
    border-color: #000000;
    border-bottom-width: 1px;    
    border-top-width: 1px;
    padding: 3px 0px 3px 10px; //상 우 하 좌
`;


const GroupDetailHome = ({data}) => {

    const domain = useContext(DomainContext);

    var [groupMember, setGroupMember] = useState([]);
    var [numGroupMem, setNumGroupMem] = useState(0);

    var reqMemberData = {groupId: data.id};

    useEffect(() => {
        fetch(domain + '/churmmunity/GetGroupMembers', {
            method: 'POST',
            body: JSON.stringify(reqMemberData),
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {setGroupMember(res);});
    }, [])

    useEffect(() => {
        setNumGroupMem(groupMember.length);
    }, [groupMember])

    return (
        <Container>
            <Title>{data.name}</Title>
            <Desc>{data.description}</Desc>
            <JoinBtn onPress={()=>{alert('가입하기')}}>
                <JoinBtnText>가입하기</JoinBtnText>
            </JoinBtn>
            {/* {groupMember && <Text>{groupMember[0].name}</Text>} */}
            <NumGroupMemCont>
                <Text fontSize={18}>멤버 {numGroupMem} 명</Text>
            </NumGroupMemCont>

        </Container>
    )
}

export default GroupDetailHome;