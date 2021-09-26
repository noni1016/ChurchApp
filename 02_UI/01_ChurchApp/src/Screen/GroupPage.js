import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserContext} from '~/Context/User';
import Tab from '~/Components/Tab';
import GroupPageHome from '~/Components/GroupPageHome';
import Feeds from '~/Components/Feeds';

const Header = styled.View`
    //height: 15%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0px 5px 10px; //상 우 하 좌
    background-color: #FFFFFF;
`;

const Title = styled.Text`
    height: 30px;
    color: black;
    font-size: 27px;
    font-family: 'DoHyeon-Regular';
`;

const TabContainer = styled.SafeAreaView`
  flex-direction: row;
  background-color: skyblue;
`;

const GroupPage = ({route}) => {
    const domain = useContext(DomainContext);
    const user = useContext(UserContext);
    const data = route.params.groupData;
    const [tabIndex, setTabIndex] = useState(0);
    var [imgWidth, setImgWidth] = useState();
    var [imgHeight, setImgHeight] = useState();    
    var [resizedWidth, setResizedWidth] = useState(100);
    var [resizedHeight, setResizedHeight] = useState(100);
    var [url, setUrl] = useState('');
    var tabs = ['홈', '게시글', '사진'];

    var [groupMember, setGroupMember] = useState([]);
    var reqMemberData = {groupId: data.id};

    var [isMember, setIsMember] = useState(false);
    
    useEffect(() => {
        setUrl(`${domain}/${data.mainImg}`);
        Image.getSize(url, (width, height) => {
            setImgWidth(width);
            setImgHeight(height);
            if(width > Dimensions.get('window').width) {
                setResizedWidth(Dimensions.get('window').width);
                setResizedHeight(Dimensions.get('window').width / width * height);
            } else {
                setResizedWidth(width);
                setResizedHeight(height);
            }
        })
    });    

    const GetGroupMember = () => {
        fetch(domain + '/Churmmunity/GetGroupMembers', {
            method: 'POST',
            body: JSON.stringify(reqMemberData),
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {setGroupMember(res);});
    };

    //DB Groups.numMember 저장 요청
    const SetNumGroupMemberDB = () => {
        let sendNumMemberData = {groupId: data.id, numMember: groupMember.length};
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

    useEffect(() => {
        GetGroupMember();
    }, [data])

    useEffect(() => {
        // 이 그룹 멤버인지 찾기
        groupMember.map((member, index) => {
            if (member.id === user.id) {
                setIsMember(true);
            }
        })
        console.log('isMember: ',isMember);
    }, [groupMember])

    const SetMember = (curUserIsMemOfThisGroup) => {
        console.log('SetMember Called!')
        setIsMember(curUserIsMemOfThisGroup);
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
                            selected={tabIndex === index}
                            label={label}
                            onPress={() => {
                                setTabIndex(index);
                            }}
                        />
                    ))}
                </TabContainer>
                {tabIndex == 0 && <GroupPageHome data={data} groupMem={groupMember} isMember={isMember} setMember={(value)=>{SetMember(value)}}/>}
                {tabIndex == 1 && <Feeds/>}
                {tabIndex == 2 && <Text>사진</Text>}
                <Text>{user.name}</Text>
            </ScrollView>
        </View>
    )
};

export default GroupPage;