import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserContext} from '~/Context/User';
import Tab from '~/Components/Tab';
import GroupPageHome from '~/Components/GroupPageHome';
import Feeds from '~/Components/Feeds';
import AddBtn from '~/Components/AddBtn';

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
    const [tabIdx, SetTabIdx] = useState(0); 
    var [resizedWidth, SetResizedWidth] = useState(100);
    var [resizedHeight, SetResizedHeight] = useState(100);
    var [url, SetUrl] = useState('');
    var [refresh, SetRefresh] = useState(false);
    var tabs = ['홈', '게시글', '사진'];

    var [clubMember, SetClubMember] = useState([]);
    var reqMemberData = {groupId: data.id};

    var [isMember, SetIsMember] = useState(false);
    
    useEffect(() => {
        SetUrl(`${domain}/${data.mainImg}`);
    }, []);    

    useEffect(() => {
        Image.getSize(url, (width, height) => {
            if (width > Dimensions.get('window').width) {
                SetResizedWidth(Dimensions.get('window').width);
                SetResizedHeight(Dimensions.get('window').width / width * height);
            } else {
                SetResizedWidth(width);
                SetResizedHeight(height);
            }
        }, () => { console.log(`fail to get imgSize : ${url}`) })
    }, [url])

    useEffect(() => {
        if (route.params.tabIdx) SetTabIdx(route.params.tabIdx);
        else SetTabIdx(0);
    }, [route.params.tabIdx]);

    useEffect(() => {
        console.log('route.params.edit: ' + route.params.edit);
        SetRefresh(!refresh);
        console.log('refresh: ' + refresh);
    }, [route.params.edit, tabIdx]);

    useEffect(() => {
        fetch(`${domain}/Club/${data.id}/Member`).then(res => res.json()).then(res => {SetClubMember(res);});
    }, [data])

    useEffect(() => {
        // 이 그룹 멤버인지 찾기
        clubMember.map((member, index) => {
            if (member.id === user.id) {
                SetIsMember(true);
            }
        })
        console.log('isMember: ',isMember);
    }, [clubMember])

    //DB Groups.numMember 저장 요청
    const SetNumGroupMemberDB = () => {
        let sendNumMemberData = {groupId: data.id, numMember: clubMember.length};
        console.log('SetNumGroupMemberDB Called!')
        fetch(domain + '/Churmmunity/SetNumGroupMember', {
            method: 'POST',
            body: JSON.stringify(sendNumMemberData),
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => console.log(res));
    };

    const SetMember = (curUserIsMemOfThisGroup) => {
        console.log('SetMember Called!')
        SetIsMember(curUserIsMemOfThisGroup);
        GetGroupMember();
        SetNumGroupMemberDB();
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
                                SetTabIdx(index);
                            }}
                        />
                    ))}
                </TabContainer>
                {tabIdx == 0 && <GroupPageHome data={data} groupMem={clubMember} isMember={isMember} setMember={(value)=>{SetMember(value)}}/>}
                {tabIdx == 1 && <Feeds groupId={data.id} feedAdded={refresh} navigation={navigation}/>}
                {tabIdx == 2 && <Text>사진</Text>}
                <Text>{user.name}</Text>
            </ScrollView>
            {tabIdx == 1 && <AddBtn OnPressMethod={() => {navigation.navigate('AddFeed', {groupData: data, navigation: navigation});}}/>}
        </View>
    )
};

export default ClubPage;