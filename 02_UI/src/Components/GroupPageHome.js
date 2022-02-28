import React, {useState, useEffect, useContext} from 'react';
import { Text, Dimensions} from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserContext} from '~/Context/User';
import GroupMemProfile from './GroupMemProfile';

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
    flex: 1;
    border-color: #000000;
    border-bottom-width: 1px;    
    border-top-width: 1px;
    padding: 3px 0px 3px 10px; //상 우 하 좌
    //background-color: blue;
`;


const ClubPageHome = ({data, members, isMember, setMember}) => {
    const domain = useContext(DomainContext);    
    const user = useContext(UserContext);
    var [numClubMem, setNumClubMem] = useState(0);

    var [button, setButton] = useState((<JoinBtn onPress={()=>{alert('가입하기')}}>
                    <JoinBtnText>가입하기</JoinBtnText>
                </JoinBtn>));

    useEffect(() => {
        setNumClubMem(members.length);
    }, [members])

    useEffect(() => {
        console.log('GroupDetailHome is Member: ', isMember);
        if (isMember) {
            setButton((<JoinBtn onPress={()=>{
                fetch(`${domain}/Club/${data.id}/Exit/${user.id}`).then(setMember(false));}}>
                        <JoinBtnText>탈퇴하기</JoinBtnText>
                    </JoinBtn>));
        } else {
            setButton((<JoinBtn onPress={()=>{
                alert('가입하기');
                fetch(`${domain}/Club/${data.id}/Join/${user.id}`).then(setMember(true));}}>
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
            </NumGroupMemCont>
            {members.map((member, index) => (<GroupMemProfile member={member} />))}
        </Container>
    )
}

export default ClubPageHome;