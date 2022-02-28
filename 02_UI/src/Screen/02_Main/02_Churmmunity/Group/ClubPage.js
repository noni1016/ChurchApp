import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserContext} from '~/Context/User';
import Tab from '~/Components/Tab';
import ClubPageHome from '~/Components/GroupPageHome';
import Feeds from '~/Components/Feeds';
import AddBtn from '~/Components/AddBtn';
import ImageSize from 'react-native-image-size';

const Header = Styled.View`
    flex-direction: row;
    justify-content: flex-start;
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

const TabContainer = Styled.SafeAreaView`
  flex-direction: row;
  background-color: skyblue;
`;

const ClubPage = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    const user = useContext(UserContext);
    const data = route.params.club;
    const [tabIdx, setTabIdx] = useState(0); 
    var [resizedWidth, setResizedWidth] = useState(100);
    var [resizedHeight, setResizedHeight] = useState(100);
    var [url, setUrl] = useState('');
    var [refresh, setRefresh] = useState(false);    
    var [clubMember, setClubMember] = useState([]);
    var [isMember, setIsMember] = useState(false);
    var tabs = ['홈', '게시글', '사진'];
    
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
        fetch(`${domain}/Club/${data.id}/Member`).then(res => res.json()).then(res => {setClubMember(res);});
    }, [data])

    /* 멤버 정보 불러왓으면 현재 유저가 그룹 멤버인지 확인 */
    useEffect(() => {
        clubMember.map((member, index) => {
            if (member.id === user.id) {
                setIsMember(true);
            }
        })
    }, [clubMember])

    /* 가입하기 누르면 현재 유저를 멤버로 설정해줌 */
    const setMember = (curUserIsMemOfThisGroup) => {
        console.log('SetMember Called!')
        setIsMember(curUserIsMemOfThisGroup);
        fetch(`${domain}/Club/${data.id}/Member`).then(res => res.json()).then(res => {setClubMember(res);});
    };


    return (
        <View>
            <Header>
                <Title>
                    {data.name}
                </Title>
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
                {tabIdx == 0 && <ClubPageHome data={data} clubMem={clubMember} isMember={isMember} setMember={(value)=>{setMember(value)}}/>}
                {tabIdx == 1 && <Feeds club={data} feedAdded={refresh} navigation={navigation}/>}
                {tabIdx == 2 && <Text>사진</Text>}
                <Text>{user.name}</Text>
            </ScrollView>
            {tabIdx == 1 && <AddBtn OnPressMethod={() => {navigation.navigate('EditFeed', {edit: false, clubData: data, navigation: navigation});}}/>}
        </View>
    )
};

export default ClubPage;