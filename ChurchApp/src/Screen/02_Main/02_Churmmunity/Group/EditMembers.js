import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Dimensions, ScrollView, Image, Alert} from 'react-native';
import {DomainContext} from '@/Context/Domain';
import {UserData} from '@/Context/User';
import Styled from 'styled-components/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

const NumGroupMemCount = Styled.View`
    flex-direction: row;
    border-color: #000000;
    border-bottom-width: 1px;    
    border-top-width: 1px;
    padding: 3px 0px 3px 10px; //상 우 하 좌
`;

const MemberEditBox = Styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
`;

const ProfileBox = Styled.TouchableOpacity`
    height: 100%;
    flex: 8;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const ProfileImgBox = Styled.Image`
    flex: 1;
    height: 70px;
`;

const ProfileNameBox = Styled.View`
    flex: 6;
    padding: 10px 10px 5px 10px; //상 우 하 좌
`;


const ProfileNameText = Styled.Text`
    font-size: 20px;
    font-family: 'DoHyeon-Regular';    
`;

const IconBox = Styled.View`
    flex-direction: row;
    flex: 2;
    justify-content: space-evenly;
    align-items: center;
    /* background-color: yellow; */
`;


const Member = ({member}) => {

    const domain = useContext(DomainContext);
    var [url, setUrl] = useState('');
    const {userData} = useContext(UserData);
    const [isLeader, setIsLeader] = useState(false);

    useEffect(() => {        
        setUrl(`${domain}/${member.photo}`);
        setIsLeader(member.id === userData.id);
    }, [])

    const onPressCrownBtn = () => {
        Alert.alert("리더 변경", `리더를 ${member.name}님으로 변경할까요?`,
        [
            {
                text: "아니오",
                onPress: () => console.log("취소"),
                style: "cancel"
            },
            {
                text: "네",
                onPress: () => console.log("확인")
            }
        ]);
    }

    const onPressCrossBtn = () => {
        Alert.alert("멤버 강퇴", `${member.name}님을 공동체에서 내보낼까요?`,
        [
            {
                text: "아니오",
                onPress: () => console.log("취소"),
                style: "cancel"
            },
            {
                text: "네",
                onPress: () => console.log("확인")
            }
        ]);
    }


    const onPressCrossBtnLeader = () => {
        Alert.alert("오잉?", `리더는 강퇴 할 수 없습니다. 먼저 리더를 변경하세요.`);
    }

    return (
        <MemberEditBox>
            <ProfileBox>
                <ProfileImgBox style={{backgroundColor: 'transparent', resizeMode: 'contain'}} source={url ? {uri: url } : null}/>
                <ProfileNameBox>
                    <ProfileNameText>{member.name}</ProfileNameText>
                </ProfileNameBox>
            </ProfileBox>
            <IconBox>
                {isLeader && <FontAwesome5 name="crown" color={'skyblue'} size={20} />}
                {isLeader && <Entypo name="cross" color={'grey'} size={25} onPress={onPressCrossBtnLeader}/>}
                {!isLeader && <FontAwesome5 name="crown" color={'black'} size={20} onPress={onPressCrownBtn} />}
                {!isLeader && <Entypo name="cross" color={'black'} size={25} onPress={onPressCrossBtn}/>}
            </IconBox>
        </MemberEditBox>
    )
}


const EditMembers = ({route, navigation}) => {
    const domain = useContext(DomainContext);    
    const members = route.params.members;

    /* 진입시 페이지 제목 {그룹 이름 - 멤버} 로 수정 */
    useEffect(() => {
        navigation.setOptions({title: `${route.params.group.name} - 멤버`});
    })
    

    return (
        <View>
        <NumGroupMemCount>
            <Text fontSize={25}>멤버 {route.params.group.numMember} 명</Text>
        </NumGroupMemCount>

        {members.map((member, idx) => (<Member key={idx} member={member}></Member>))}
        </View>
        
    )
}

export default EditMembers;