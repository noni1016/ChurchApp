import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import Tab from '~/Components/Tab';
import ClubPageHome from '~/Components/GroupPageHome';
import Photos from '~/Components/Photos';
import Feeds from '~/Components/Feeds';
import AddBtn from '~/Components/AddBtn';
import ImageSize from 'react-native-image-size';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

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

const ClubPage = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    const {userData} = useContext(UserData);
    const data = route.params.group;
    const [tabIdx, setTabIdx] = useState(0); 
    var [resizedWidth, setResizedWidth] = useState(100);
    var [resizedHeight, setResizedHeight] = useState(100);
    var [url, setUrl] = useState('');
    var [refresh, setRefresh] = useState(false);    
    var [members, setMembers] = useState([]);
    var [isMember, setIsMember] = useState(false);
    var [isLeader, setIsLeader] = useState(false);
    var tabs = ['홈', '게시글', '사진'];
    
    /* 첫 마운팅때 Group 상단 사진 url 설정 */
    useEffect(() => {
        setUrl(`${domain}/ClubMainImg/${data.mainImg}`);
    }, []);    

    /* Group 상단 사진의 사이즈를 화면 사이즈에 맞게 설정 */
    useEffect(() => {
        ImageSize.getSize(url).then((size) => {
            let width = size.width;
            let height = size.height;
            if (width > Dimensions.get('window').width) {
                setResizedWidth(Dimensions.get('window').width);
                setResizedHeight(Dimensions.get('window').width / width * height);
            } else {
                setResizedWidth(width);
                setResizedHeight(height);
            }
        }, () => { console.log(`fail to get imgSize : ${url}`) })
    }, [url])

    /* 네비게이션으로 reload 된 경우 탭 유지해줌 */
    useEffect(() => {
        if (route.params.tabIdx) setTabIdx(route.params.tabIdx);
        else setTabIdx(0);
    }, [route.params.tabIdx]);

    useEffect(() => {
        console.log('route.params.edit: ' + route.params.edit);
        setRefresh(!refresh);
        console.log('refresh: ' + refresh);
    }, [route.params.edit, tabIdx]);

    /* 멤버 정보 불러오기 */
    useEffect(() => {
        fetch(`${domain}/Club/${data.id}/Member`).then(res => res.json()).then(res => {setMembers(res);});
    }, [data])

    /* 멤버 정보 불러왓으면 현재 유저가 그룹 멤버인지 확인. 리더 여부도 확인 */
    useEffect(() => {        
        members.map((member, index) => {
            if (member.id === userData.id) {
                setIsMember(true);
                if (member.role === 1)
                    setIsLeader(true);
            }
        })
    }, [members])

    /* 가입하기 누르면 현재 유저를 멤버로 설정해줌 */
    const setMember = (curUserIsMemOfThisGroup) => {
        console.log('SetMember Called!')
        setIsMember(curUserIsMemOfThisGroup);
        fetch(`${domain}/Club/${data.id}/Member`).then(res => res.json()).then(res => {setMembers(res);});
    };

   

    return (
        <>
            <Header>
                <Title>
                    {data.name}
                </Title>
                <Side>
                <Icon2 name="notification" size={26} color={'black'} onPress={() => navigation.navigate('GroupNotification', {club: data, isLeader: isLeader})} />
                {isLeader && <Icon1 name="settings-outline" size={26} color={'black'} onPress={() => navigation.navigate('EditChurmmunity', {edit: 1, editData: data, navigation: navigation})} />}
                </Side>          
            </Header>
            <ScrollView>
                <Image style={{ backgroundColor: '#000000', width: resizedWidth, height: resizedHeight, resizeMode: 'contain' }} source={url ? {uri: url } : null} />
                {/* Sub navigation. 실제 네비게이션은 아니지만 버튼 선택을 통해 네비처럼 동작하도록 구현 */}
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
                {tabIdx == 0 && <ClubPageHome data={data} members={members} isMember={isMember} isLeader={isLeader} setMember={(value)=>{setMember(value)}} stackNavi={navigation}/>}
                {tabIdx == 1 && <Feeds club={data} feedAdded={refresh} navigation={navigation}/>}
                {tabIdx == 2 && <Photos club={data}>사진</Photos>}
                <Footer/>
            </ScrollView>
            {tabIdx == 1 && <AddBtn OnPressMethod={() => {navigation.navigate('EditFeed', {edit: false, club: data, navigation: navigation});}}/>}
        </>
    )
};

export default ClubPage;