import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import Tab from '~/Components/Tab';
import ImageSize from 'react-native-image-size';
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

const tempSpot = {id: 1, name: '막무가내 리코더 합주', mainImg: 'GroupImg/1659157815604.jpg', location: '올림픽공원 나홀로나무 앞', location_ll: null, description: `인적 드물고 경치 좋은 곳에서 리코더 뿝뿝 하실 분들~!
찬양 연주 같이 해요`, keyword: ['리코더', '합주', '악기', '연주'], time: '220501 Sun 7:30 PM'};

const SpotPage = ({navigation}) => {
    const domain = useContext(DomainContext);
    const {userData} = useContext(UserData);   
    const data = tempSpot;
    var [url, setUrl] = useState('');
    var [resizedWidth, setResizedWidth] = useState(100);
    var [resizedHeight, setResizedHeight] = useState(100);
    var [members, setMembers] = useState([]);
    var [isMember, setIsMember] = useState(false);
    var [isLeader, setIsLeader] = useState(false);
    var tabs = ['번개 정보', '참가자'];
    const [tabIdx, setTabIdx] = useState(0); 

    /* 첫 마운팅때 Group 상단 사진 url 설정 */
    useEffect(() => {
        setUrl(`${domain}/${data.mainImg}`);
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

    /* 멤버 정보 불러오기 */
    useEffect(() => {
        fetch(`${domain}/Club/${data.id}/Member`).then(res => res.json()).then(res => { setMembers(res); });
    }, [data])

    /* 멤버 정보 불러왓으면 현재 유저가 그룹 멤버인지 확인. 리더 여부도 확인 */
    useEffect(() => {
        members.map((member, index) => {
            if (member.id === userData.id) {
                setIsMember(true);
                if (member.role === 'leader')
                    setIsLeader(true);
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
                <Icon2 name="notification" size={26} onPress={() => navigation.navigate('GroupNotification', {club: data, isLeader: isLeader})} />
                {isLeader && <Icon1 name="settings-outline" size={26} onPress={() => navigation.navigate('EditChurmmunity', {edit: 1, editData: data, navigation: navigation})} />}
                </Side>          
            </Header>
            <ScrollView>
            <Image style={{ backgroundColor: '#000000', width: resizedWidth, height: resizedHeight, resizeMode: 'contain' }} source={url ? {uri: url } : null} />
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
            </ScrollView>
        </>
    )
};

export default SpotPage;