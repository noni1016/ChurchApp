import React, {useState, useEffect, useContext} from 'react';
import { Text, Dimensions, Alert } from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import GroupMemProfile from './GroupMemProfile';
import Icon from 'react-native-vector-icons/Ionicons';

const Container = Styled.View`
    padding: 10px 10px 0px 10px; //상 우 하 좌
    //background-color: #ff0000;    
`;

const Title = Styled.Text`
    height: 30px;
    color: black;
    font-size: 25px;
    font-family: 'DoHyeon-Regular';    
`;

const Desc = Styled.Text`
    font-size: 20px;
`;

const JoinBtn = Styled.TouchableOpacity`
    flex: 1;
    margin: 20px ${Dimensions.get('window').width * 0.2}px 15px ${Dimensions.get('window').width * 0.2}px; //상 우 하 좌
    padding: 10px 0px 5px 0px; //상 우 하 좌
    align-items: center;
    justify-content: center;  
    background-color: skyblue;
`;

const JoinBtnText = Styled.Text`
    font-size: 25px;    
    color: white;
    font-family: 'DoHyeon-Regular'; 
`;

const NumGroupMemCont = Styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    border-color: #000000;
    border-bottom-width: 1px;    
    border-top-width: 1px;
    padding: 3px 0px 3px 10px; //상 우 하 좌
    //background-color: blue;
`;


const ClubPageHome = ({data, members, isMember, isLeader, setMember, navigation}) => {
    const domain = useContext(DomainContext);    
    const {userData, setUserData} = useContext(UserData);
    var [numClubMem, setNumClubMem] = useState(0);

    var [button, setButton] = useState((<JoinBtn onPress={()=>{alert('로딩중')}}>
                    <JoinBtnText>가입하기</JoinBtnText>
                </JoinBtn>));

    useEffect(() => {
        setNumClubMem(members.length);
    }, [members])

    useEffect(() => {
        console.log('GroupDetailHome is Leader: ', isLeader);
        if (isMember) {
            setButton((<JoinBtn onPress={()=>{
                if (!isLeader)
                    fetch(`${domain}/Club/${data.id}/Exit/${userData.id}`).then(setMember(false));
                else
                    Alert.alert("리더 탈주 감지!", "리더는 탈퇴할 수 없습니다. 멤버 관리 페이지에서 먼저 리더를 변경하세요.");
                }}>
                    <JoinBtnText>탈퇴하기</JoinBtnText>
                </JoinBtn>));
        } else {
            setButton((<JoinBtn onPress={()=>{
                fetch(`${domain}/Club/${data.id}/Join/${userData.id}`).then(setMember(true));}}>
                        <JoinBtnText>가입하기</JoinBtnText>
                    </JoinBtn>));
        }        
    }, [isMember])

    return (
        <Container>
            <Title>{data.name}</Title>
            <Desc>{data.description}</Desc>
            {button}
            <NumGroupMemCont>
                <Text fontSize={18}>멤버 {numClubMem} 명</Text>
                {isLeader && <Icon name="settings-outline" size={18} onPress={() => navigation.navigate('EditMembers', {group: data, members: members, navigation: navigation})} />}
            </NumGroupMemCont>
            {members.map((member, index) => (<GroupMemProfile key={index.toString()} member={member} />))}
        </Container>
    )
}

export default ClubPageHome;