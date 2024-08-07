import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import Tab from '~/Components/Tab';
import ImageSize from 'react-native-image-size';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import SpotPageHome from '~/Components/SpotPageHome';
import SpotMembersView from '~/Components/SpotMembersView';
import { useIsFocused } from '@react-navigation/native';

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
  justify-content: space-between;
`;

const JoinBtn = Styled.TouchableOpacity`
    position: absolute;
    top: 0%;
    left: 35%;
    background-color: ${props => props.state ? 'rgba(44, 136, 217, 1)' : 'gray'};
    color: white;
    width: 30%;
    height: 100%;
    font-size: 30px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    font-size: 27px;
    font-family: 'DoHyeon-Regular';
    border: 3px solid black;
    border-radius: 5px;
`;

const tempSpot = {id: 1, name: '막무가내 리코더 합주', mainImg: 'GroupImg/1659157815604.jpg', location: '올림픽공원 나홀로나무 앞', location_ll: {x:126.93415099999976, y: 37.354753799999926}, description: `인적 드물고 경치 좋은 곳에서 리코더 뿝뿝 하실 분들~! \n
찬양 연주 같이 해요`, keyword: ['리코더', '합주', '악기', '연주'], time: '220501 Sun 7:30 PM'};

const SpotPage = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    const {userData, updateUserSpot} = useContext(UserData);   
    // const data = route.params.group;
    const [data, setData] = useState(route.params.group);
    var [url, setUrl] = useState('');
    var [resizedWidth, setResizedWidth] = useState(100);
    var [resizedHeight, setResizedHeight] = useState(100);
    var [members, setMembers] = useState([]);
    var [isMember, setIsMember] = useState(false);
    var [isLeader, setIsLeader] = useState(false);
    var tabs = ['번개 정보        ', '        참가자'];
    const [tabIdx, setTabIdx] = useState(-1); 
    var [joinText, setJoinText] = useState('함께하기');
    var [leader, setLeader] = useState();
    const [updateMember, setUpdateMember] = useState(false);
    const isFocused = useIsFocused();


    /* 메인페이지에서 데이터 다시 세팅 */
    useEffect(() => {
        console.log(data.id);
        fetch(`${domain}/Group/Spot/${data.id}`).then(res => res.json()).then(res => {console.log(res); setData(res)});
    }, [isFocused])


    /* 첫 마운팅때 Group 상단 사진 url 설정 */
    useEffect(() => {
        if (data == null) return;
        setUrl(`${domain}/SpotMainImg/${data.mainImg}`);
        setIsLeader(false);
        if (data.leader === userData.id) {
            setIsLeader(true);
        }
    }, [data]);    

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
    }, [data, url])

    /* 멤버 정보 불러오기 */
    useEffect(() => {
        if (data) fetch(`${domain}/Group/Member/Spot/${data.id}`).then(res => res.json()).then(res => setMembers(res));
        setUpdateMember(false);
    }, [isFocused, data, updateMember])

    /* 멤버 정보 불러왓으면 현재 유저가 그룹 멤버인지 확인. 리더 여부도 확인 */
    useEffect(() => {
        console.log("member changed");
        members.map((member, index) => {
            if (member.role === 1)
            {
                setLeader(member);              
            }       
            if (member.id === userData.id) {
                setMember(true);
            }
            setTabIdx(0);         
        })
    }, [members])

    /* 함께하기 버튼 누르면 버튼이 파란색으로 바뀜 */
    const onPressJoinBtn = () => {
        if (isLeader) {
            alert('리더는 탈퇴할 수 없습니다. 먼저 리더를 변경해주세요.');
            return;
        }
        if (isMember == false) {
            // 멤버로 넣어주기
            fetch(`${domain}/Group/Join/Spot/${data.id}/${userData.id}`);
            setMember(true);
        }
        else {
            fetch(`${domain}/Group/Exit/Spot/${data.id}/${userData.id}`);
            setMember(false);
        }        
    }

    /* 현재 유저를 멤버로 설정해줌 */
    const setMember = (curUserIsMemOfThisGroup) => {
        console.log("셋멤버!!!");
        console.log(isMember)
        console.log(curUserIsMemOfThisGroup)
        if ((isMember == false && curUserIsMemOfThisGroup == true) || (isMember == true && curUserIsMemOfThisGroup == false))
            fetch(`${domain}/Spot/${data.id}/Member`).then(res => res.json()).then(res => { console.log(res); setMembers(res); });
        setIsMember(curUserIsMemOfThisGroup);
        if (curUserIsMemOfThisGroup) setJoinText('참가중!');
        else setJoinText('함께하기');
        updateUserSpot();
    };

    return data ? (
        <>
            <Header>
                <Title>
                    {data.name}
                </Title>
                <Side>
                <Icon2 name="notification" size={26} onPress={() => navigation.navigate('GroupNotification', {club: data, isLeader: isLeader})} />
                {isLeader && <Icon1 name="settings-outline" size={26} onPress={() => navigation.navigate('EditChurmmunity', {edit: 1, editData: data, createType: 2, navigation: navigation})} />}
                </Side>          
            </Header>
            <ScrollView>
            <Image style={{ backgroundColor: '#000000', width: "100%", height: 300, resizeMode: 'cover' }} source={url ? {uri: url } : null} />
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
                    <JoinBtn state={isMember} onPress={() => {onPressJoinBtn()}}><Text style={{fontSize: 20, fontFamily: 'DoHyeon-Regular', color: 'white'}}>{joinText}</Text></JoinBtn>
                </TabContainer>
                {tabIdx == 0 && <SpotPageHome data={data} members={members} isLeader={isLeader} leader={leader} stackNavi={navigation} />}
                {tabIdx == 1 && <SpotMembersView data={data} members={members} isLeader={isLeader} leader={leader} updateMember={setUpdateMember} stackNavi={navigation} />}
            </ScrollView>
        </>
    ) : (<Text>Loading...</Text>)
};

export default SpotPage;