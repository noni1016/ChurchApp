import React, {useState, useEffect, useContext} from 'react';
import {Text, Image, Alert} from 'react-native';
import styled from 'styled-components/native';
import { DomainContext } from '~/Context/Domain';
import { UserData } from '~/Context/User';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

const GroupTileBox = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 100px;
    background-color: white;
    border-bottom-width: 5px;
    border-color: black;
    padding: 5px;
    margin-bottom: 3px;
`;

const TextArea = styled.View`
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex: 4;
`;

const CtrlArea = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
`;

// type: (Club, Spot)
const GroupTile = ({group, type, isCurrentUser, stackNavi}) => {
    const domain = useContext(DomainContext);
    const {userData} = useContext(UserData);
    const [imgUrl, setImgUrl] = useState(`${domain}/${type}MainImg/${group.mainImg}`);
    const [isLeader, setIsLeader] = useState(false);

    useEffect(() => {
        setIsLeader(group.leader == userData.id);
    }, [])

    const onPressCrossBtn = () => {
        Alert.alert("공동체 탈퇴", `${group.name} 공동체를 나갈까요?`,
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

    return (
        <GroupTileBox onPress={() => {stackNavi.navigate(`${type}Page`, {group: group})}}>
            <Image style={{width: 50, height: 50, flex: 2, resizeMode: 'contain'}} source={{uri: imgUrl}}/>
            <TextArea>
                <Text>{group.name}</Text>
                {type == 'Club' && <Text>{group.location}</Text>}
                {type == 'Spot' && <Text>{group.time}</Text>}
            </TextArea>
            <CtrlArea>
                {isLeader && <FontAwesome5 name="crown" color={'blue'} size={20} />}
                {isLeader && isCurrentUser && <Entypo name="cross" color={'grey'} size={25} onPress={() => alert('리더는 강퇴 할 수 없습니다. 먼저 리더를 변경하세요.')}/>}
                {!isLeader && isCurrentUser && <Entypo name="cross" color={'black'} size={25} onPress={onPressCrossBtn}/>}
            </CtrlArea>
            {type == 'club' && <Text>GroupTile</Text>}
        </GroupTileBox>
    )
};

export default GroupTile;