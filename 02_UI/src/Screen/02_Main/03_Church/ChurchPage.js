import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, View, Text, Image, Alert } from 'react-native';
import Styled from 'styled-components/native';
import Styles, { DefaultText } from '~/Style.js';
import { useIsFocused } from '@react-navigation/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Tab from '~/Components/Tab';
import AddBtn from '~/Components/AddBtn';
import DaumMap from '~/Screen/03_Map/DaumMapController';
import RectangleBtn from '~/Components/RectangleBtn';
import GroupMemProfile from '~/Components/GroupMemProfile';

const Header = Styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px 5px 10px; 
    background-color: #FFFFFF;
`;

const Title = Styled.Text`
    height: 30px;
    color: black;
    font-size: 27px;
    font-family: 'DoHyeon-Regular';
`;

const Side = Styled.View`
    justify-content: flex-end;
    flex-direction: row;
    margin: 0px 5px 0px 0px;
`;

const TabContainer = Styled.SafeAreaView`
  flex-direction: row;
  background-color: skyblue;
`;

const Footer = Styled.View`
    height: 200px;
`;

const ChurchPage = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    const {userData, userChurch} = useContext(UserData);
    const data = route.params.group;
    const [tabIdx, setTabIdx] = useState(0);
    const [members, setMembers] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [isLeader, setIsLeader] = useState(false)
    const tabs = ['홈', '게시글', '사진'];

    /* 멤버 정보 불러오기 */
    useEffect(() => {
        fetch(`${domain}/Church/Member/${data.id}`).then(res => res.json()).then(res => {setMembers(res)});
        console.log("update member data");
    }, [data, userChurch]);

    /* 멤버 정보 불러왓으면 현재 유저가 그룹 멤버인지 확인. 리더 여부도 확인 */
    useEffect(() => {
        setIsMember(false);        
        members.map((member, index) => {
            if (member.id === userData.id) {
                setIsMember(true);
                if (member.role === 1)
                    setIsLeader(true);
            }
        })
        console.log("update is member");
    }, [members])

    return (
        <>
            <Header>
                <Title>
                    {data.name}
                </Title>
                <Side>
                    <Icon2 name="notification" size={26} color={'black'} onPress={() => alert('Notification')}/>
                    {isLeader && <Icon1 name="settings-outline" size={26} color={'black'} onPress={() => alert('EditChurch')} />}
                </Side>
            </Header>
            <ScrollView>
                <Image style={{ backgroundColor: 'black', width: '100%', height: 300, resizeMode: 'cover'}} source={{uri: `${domain}/ChurchMainImg/${data.mainImg}`}} />
                <TabContainer>
                    {tabs.map((label, index) => (
                        <Tab
                            key={`tab-${index}`}
                            selected={tabIdx === index}
                            label={label}
                            onPress={() => {
                                setTabIdx(index);
                            }}
                        />
                    ))}
                </TabContainer>
                {tabIdx == 0 && <ChurchPageHome data={data} members={members} isMember={isMember} isLeader={isLeader}/>}
                {tabIdx == 1 && <Feeds church={data} navigation={navigation}/>}
                {tabIdx == 2 && <Photos />}
                <Footer/>
            </ScrollView>
            {tabIdx == 1 && <AddBtn OnPressMethod={() => {alert('EditFeed')}}/>}
        </>
    )
}

const Container = Styled.View`
    padding: 10px 10px 0px 10px; //상 우 하 좌
    //background-color: #ff0000;    
`;

const Desc = Styled.Text`
    font-size: 20px;
    color: black;
`;

const NumGroupMemCont = Styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    border-color: #000000;
    border-bottom-width: 1px;    
    border-top-width: 1px;
    padding: 3px 0px 3px 10px;
    //background-color: blue;
`;


const ChurchPageHome = ({data, members, isMember, isLeader}) => {
    const domain = useContext(DomainContext);    
    const {userData, setUserData, updateUserChurch} = useContext(UserData);
    const isFocused = useIsFocused();
    const [joinText, setJoinText] = useState('활동 교회로 등록');

    useEffect(() => {
        console.log(`isMember: ${isMember}`)
        if (isMember) {
            setJoinText('활동 교회 떠나기');
        } else {            
            setJoinText('활동 교회로 등록');
        }
    }, [isMember])

    const onPressJoinBtn = () => {
        if (isMember && !isLeader) {
            fetch(`${domain}/Church/Exit/${data.id}/${userData.id}`).then(updateUserChurch());
        } else if (isLeader) {
            Alert.alert("리더 탈주 감지!", "리더는 탈퇴할 수 없습니다. 멤버 관리 페이지에서 먼저 리더를 변경하세요.");
        } else {
            fetch(`${domain}/Church/Join/${data.id}/${userData.id}`).then(updateUserChurch());
        }
    }

    return (
        <Container>
            <Title>{data.name}</Title>
            <Desc>{data.description}</Desc>
            {isFocused && data.location_ll && <DaumMap currentRegion={{
                    latitude: parseFloat(data.location_ll.y),
                    longitude: parseFloat(data.location_ll.x),
                    zoomLevel: 5
                }}
                mapType={"Standard"}
                style={{ width: 400, height: 400, backgroundColor: 'transparent' }}
                markers={[{
                    latitude: parseFloat(data.location_ll.y),
                    longitude: parseFloat(data.location_ll.x),
                    pinColor: "red",
                    pinColorSelect: "yellow",
                    title: "marker test",
                    draggable: false,
                }]}                
                /> 
            }

            <RectangleBtn text={joinText} color={isMember? 'gray' : 'skyblue'} onPress={() => onPressJoinBtn()} />
            
            <NumGroupMemCont>
                <Text style={Styles.default}>멤버 {data.numMember} 명</Text>
                {isLeader && <Icon1 name="settings-outline" size={18} color={'black'} onPress={() => alert('editMembers')} />}
            </NumGroupMemCont>

            {members.map((member, index) => (<GroupMemProfile key={index.toString()} member={member} isLeader={member.id == data.leader} />))}
        </Container>
    )
};

const Feeds = ({church, navigation}) => {
    const domain = useContext(DomainContext);
    const [feeds, setFeeds] = useState([]);
    const isFocused = useIsFocused();

    /* Feed 불러오기 */
    useEffect(() => {
        fetch(`${domain}/Church/${church.id}/Feeds`).then(res => res.json()).then(res => {setFeeds(res);});
    }, [church])


    return (<Text>Feeds</Text>)
}

const Photos = () => {
    return (<Text>Photos</Text>)
}

export default ChurchPage;