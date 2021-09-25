import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserContext} from '~/Context/User';
import GroupMemProfile from './GroupMemProfile';

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
    //background-color: blue;
`;


const GroupPageHome = ({data, groupMem, isMember, setMember}) => {

    const domain = useContext(DomainContext);    
    const user = useContext(UserContext);
    var [numGroupMem, setNumGroupMem] = useState(0);
    var reqJoinExitData = {groupId: data.id, userId: user.id};

    var [button, setButton] = useState((<JoinBtn onPress={()=>{alert('가입하기')}}>
                    <JoinBtnText>가입하기</JoinBtnText>
                </JoinBtn>));

    useEffect(() => {
        setNumGroupMem(groupMem.length);
    }, [groupMem])

    useEffect(() => {
        console.log('GroupDetailHome is Member: ', isMember);
        if (isMember) {
            setButton((<JoinBtn onPress={()=>{
                alert('탈퇴하기');
                fetch(domain + '/churmmunity/ExitGroup', {
                    method: 'POST',
                    body: JSON.stringify(reqJoinExitData),
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => console.log(res));
                setMember(false);
                }}>
                        <JoinBtnText>탈퇴하기</JoinBtnText>
                    </JoinBtn>));
        } else {
            setButton((<JoinBtn onPress={()=>{
                alert('가입하기');
                fetch(domain + '/churmmunity/JoinGroup', {
                    method: 'POST',
                    body: JSON.stringify(reqJoinExitData),
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => {console.log(res);});
                setMember(true);
                }}>
                        <JoinBtnText>가입하기</JoinBtnText>
                    </JoinBtn>));
        }        
    }, [isMember])

    return (
        <Container>
            <Title>{data.name}</Title>
            <Desc>{data.description}</Desc>
            {button}
            {/* {groupMember && <Text>{groupMember[0].name}</Text>} */}
            <NumGroupMemCont>
                <Text fontSize={18}>멤버 {numGroupMem} 명</Text>
            </NumGroupMemCont>
            {groupMem.map((member, index) => (
                <GroupMemProfile member={member} />
                // <Text>member {member.name}</Text>
            ))}



        </Container>
    )
}

export default GroupPageHome;