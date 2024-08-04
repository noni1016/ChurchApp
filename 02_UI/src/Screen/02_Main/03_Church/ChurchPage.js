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
import Feed from '~/Components/Feed';
import Photos from '~/Components/Photos';
import { TabNavi } from '~/Context/Navi';

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
    // const data = route.params.group;
    const [data, setData] = useState(route.params.group);
    const [tabIdx, setTabIdx] = useState(0);
    const [members, setMembers] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [isLeader, setIsLeader] = useState(false)
    const [reload, setReload] = useState(false);
    const tabs = ['홈', '게시글', '사진'];
    const isFocused = useIsFocused();
    const [updateMember, setUpdateMember] = useState(false);

    /* 메인페이지에서 데이터 다시 세팅 */
    useEffect(() => {
        console.log(data.id);
        fetch(`${domain}/Church/${data.id}`).then(res => res.json()).then(res => {console.log(res); setData(res)});
    }, [isFocused])

    /* 멤버 정보 불러오기 */
    useEffect(() => {        
        fetch(`${domain}/Church/${data.id}/Member`).then(res => res.json()).then(res => {console.log(res); setMembers(res)});
        console.log("update member data");
        console.log(isFocused);
        setUpdateMember(false);
        console.log(data)
    }, [isFocused, data, userChurch, updateMember]);


    /* 멤버 정보 불러왓으면 현재 유저가 그룹 멤버인지 확인. 리더 여부도 확인 */
    useEffect(() => {
        // console.log(members);
        setIsMember(false);    
        setIsLeader(false);    
        let data_= data;
        members.map((member, index) => {
            if (member.id == userData.id) {
                setIsMember(true);
                console.log("update isMember");
                if (member.role == 1)
                    {setIsLeader(true); console.log("updqte isLeader")}
            }
        })
    }, [members])

    return (
        <>
            <Header>
                <Title>
                    {data.name}
                </Title>
                <Side>
                    <Title>
                    {data.pastor}
                    </Title>
                    <Icon2 name="notification" size={26} color={'black'} onPress={() => alert('공지사항이 없습니다.')}/>
                    {isLeader && <Icon1 name="settings-outline" size={26} color={'black'} onPress={() => {{navigation.navigate('EditChurchPage', {churchData : data, navigation: navigation})}}} />}
                </Side>
            </Header>
            <ScrollView>
                <Image style={{ backgroundColor: 'black', width: '100%', height: 300, resizeMode: 'cover'}} source={{uri: `${domain}/ChurchMainImg/${data.mainImg}`+ "?cache="+Math.random()}} />
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
                {tabIdx == 0 && <ChurchPageHome data={data} members={members} isMember={isMember} isLeader={isLeader} updateMember={setUpdateMember} stackNavi={navigation}/>}
                {tabIdx == 1 && <Feeds church={data} reload={reload} setReload={setReload} isMember={isMember} navigation={navigation}/>}
                {tabIdx == 2 && <Photos groupType='Church' group={data}/>}
                <Footer/>
            </ScrollView>
            {tabIdx == 1 && isMember && <AddBtn OnPressMethod={() => {navigation.navigate('EditFeed', {edit: false, groupType: 'Church', group: data, reload: reload, setReload: setReload, navigation: navigation});}}/>}
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


const ChurchPageHome = ({data, members, isMember, isLeader, updateMember, stackNavi}) => {
    const domain = useContext(DomainContext);    
    const {tabNavi} = useContext(TabNavi);
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
    }, [isFocused, isMember, data])

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
                {isLeader && <Icon1 name="settings-outline" size={18} color={'black'} onPress={() => stackNavi.navigate('EditMembers', {groupType: 'Church', group: data, members: members, updateMember: updateMember, navigation: stackNavi})} />}
            </NumGroupMemCont>

            {members.map((member, index) => (<GroupMemProfile key={index.toString()} member={member} isLeader={member.id == data.leader} onPress={() => {
                console.log("멤버맵안!!!");
                if (member.id == userData.id) tabNavi.navigate('Profile', {member: member});
                else stackNavi.navigate('Profile', {member: member});
            }} />))}
        </Container>
    )
};

const Feeds = ({church, reload, setReload, isMember, navigation}) => {
    const domain = useContext(DomainContext);
    const [feeds, setFeeds] = useState([]);
    const isFocused = useIsFocused();

    /* Feed 불러오기 */
    useEffect(() => {
        fetch(`${domain}/Church/${church.id}/Feeds`).then(res => res.json()).then(res => {setFeeds(res);});
    }, [church, reload])

    return (
        <>
            {feeds.map((feed, index) => (<Feed groupType={'Church'} group={church} feed={feed} key={index} reload={reload} setReload={setReload} isMember={isMember} navigation={navigation}/>))}
        </>
    );
}


export default ChurchPage;