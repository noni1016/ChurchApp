import React, {useState, useEffect, useContext} from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {KakaoAuthData, UserData, TryGetUserData} from '~/Context/User';
import {
    createStackNavigator,
} from '@react-navigation/stack';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import DaumMap from '../../03_Map/DaumMapController';
import { useIsFocused } from '@react-navigation/native';
import PlusBtn from '~/Components/PlusBtn';
import RectangleBtn from '~/Components/RectangleBtn';
import {logout} from '@react-native-seoul/kakao-login';
import Auth from '~/Screen/01_Auth/Auth';
import GroupTile from '~/Components/GroupTile';
import ClubPage from '~/Screen/02_Main/02_Churmmunity/Group/ClubPage'
import SpotPage from '~/Screen/02_Main/02_Churmmunity/Group/SpotPage'
import SearchLocate from '~/Screen/03_Map/SearchLocate';
import EditProfile from './EditProfile';
import ShowProfileImg from './ShowProfileImg';
import EditChurmmunity from '~/Screen/02_Main/02_Churmmunity/Group/EditChurmmunity';
import SearchChurchPage from '~/Screen/02_Main/03_Church/SearchChurchPage';
import ChurchView from '~/Screen/02_Main/04_Profile/ChurchView'
import AddChurchPage from '~/Screen/02_Main/03_Church/AddChurchPage';
import ChurchPage from '../03_Church/ChurchPage';

const tempUser = {id: 4, name: "짱쎄", photo: 'Profile/짱쎄.jpg', role: 'user'};
const Stack = createStackNavigator();
const options = {
    title: 'Load Photo',
    customButton: [
        { name: 'button_id_1', title: 'CustomButton 1'},
        { name: 'button_id_2', title: 'CustomButton 2'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
}

const HeaderButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    width: 120px;
`;

const HeaderBox = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 100px;
    background-color: transparent;
    border-bottom-width: 5px;
    border-color: black;
    padding-bottom: 3px;
    margin-bottom: 3px;;
`;

const HeaderTextArea = styled.View`
    flex-direction: column;
    justify-content: space-between;
`;

const ChangePhoto = styled.TouchableOpacity`
 height: 100%;
 background-color: transparent;
 margin: 0px 10px 0px 0px; //상 우 하 좌
 `;

const CommonBtn = styled.TouchableOpacity`
background-color: green;
width: 20%;
border-bottom-width: 3px;
`;

const InfoArea = styled.View`
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    background-color: transparent;
`;

const InfoTextBold = styled.Text`
    font-size: 20px;
    font-family: 'DoHyeon-Regular';   
    margin-top: 5px;
    margin-bottom: 5px;
    height: 30px;
`;

const InfoText = styled.Text`
    font-size: 16px;
    font-family: 'DoHyeon-Regular';   
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 5%;
    height: 25px;
`;

const ActivityRecordArea = styled.View`
    width: 90%;
    background-color: transparent;
    margin-left: 5%;
`;

const ProfileMain = ({navigation, route}) => {
    const domain = useContext(DomainContext);
    const {userData, userClub, userSpot, userChurch} = useContext(UserData);
    const [member, setMember] = useState(route ? route.params.member : userData);
    const [imgSrc, setImgSrc] = useState('');
    const [locate, setLocate] = useState([0,0]);
    const [region, setRegion] = useState('');
    const [userImgUrl, setUserImgUrl] = useState(`${domain}/Profile/Jesus.png`);
    const isFocused = useIsFocused();
    const {kakaoAuthData, setKakaoAuthData} = useContext(KakaoAuthData);
    const {tryGetUserData, setTryGetUserDataFlag} = useContext(TryGetUserData);
    const [memberClub, setMemberClub] = useState([]);
    const [memberSpot, setMemberSpot] = useState([]);
    const [memberChurch, setMemberChurch] = useState([]);
    const [churchName, setChurchName] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        setMember(route != undefined ? route.params.member : userData);
    }, [userData])

    useEffect(() => {
        if (member)
        {
            navigation.setOptions({
                title: member.name,
                headerShown: true,
                headerRight: () => (
                    <HeaderButtonsContainer>
                        {userData.id != member.id && <Icon2 name="notification" size={26} onPress={() => alert('신고하기')} />}
                        <Icon2 name="message1" size={26} onPress={() => alert('채팅')} />
                        {userData.id == member.id && <Icon1 name="settings-outline" size={26} onPress={() => {navigation.navigate('EditProfile', {navigation: navigation})}} />}
                    </HeaderButtonsContainer>
                )
            });

            if (member.id == userData.id)
            {
                setMemberClub(userClub);
                setMemberSpot(userSpot);
                setMemberChurch(userChurch);
            }
            else
            {
                fetch(`${domain}/User/${member.id}/Club`).then(res => res.json()).then(res => {setMemberClub(res)});
                fetch(`${domain}/User/${member.id}/Spot`).then(res => res.json()).then(res => {setMemberSpot(res)});
                fetch(`${domain}/User/${member.id}/Church`).then(res => res.json()).then(res => {setMemberChurch(res)});
            }
            
            // console.log(member.church);
            if (member.church)
            {
                fetch(`${domain}/Church/${member.church}`).then(res => res.json()).then(res => {setChurchName(res.name);});
            }
        }
    }, [member])

    useEffect(() => {
        // console.log(imgSrc)
        if (imgSrc)
        {
            // console.log("=====photo change=====");
            // console.log(imgSrc.uri);
            const imageData = new FormData();
            imageData.append('file', {
              uri: imgSrc.uri,
              type: imgSrc.type,
              name: imgSrc.fileName,
              data: imgSrc.data
            });
      
            let fetchHeader = {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            }
            reqChangeUserInfo(fetchHeader, "photo", imageData)
          }
    }, [imgSrc])

    const handleRefresh = async () => {
        console.log('handleRefreshStore');
        setIsRefreshing(true);
        
        if (member.id == userData.id)
        {
            setMemberClub(userClub);
            setMemberSpot(userSpot);
            setMemberChurch(userChurch);
        }
        else
        {
            fetch(`${domain}/User/${member.id}/Club`).then(res => res.json()).then(res => {setMemberClub(res)});
            fetch(`${domain}/User/${member.id}/Spot`).then(res => res.json()).then(res => {setMemberSpot(res)});
            fetch(`${domain}/User/${member.id}/Church`).then(res => res.json()).then(res => {setMemberChurch(res)});
        }
        setIsRefreshing(false);
    }


    return (
        <>
            {
                userData &&
                <ScrollView style={{padding: 10}} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}>
                <HeaderBox>
                <ChangePhoto onPress={() => {navigation.navigate('ShowProfileImg')}}>
                    <Image style={{ width: 70, height: 70, flex: 1, resizeMode: 'contain' }} source={{ uri: `${domain}/Profile/${member.photo}` + "?cache="+Math.random() }}/>
                </ChangePhoto>

                <HeaderTextArea style={{ flex: 3 }}>
                        <Text style={{ fontWeight: 'bold'}}>{member.name}</Text>
                        {member.description ? <Text>{member.description}</Text> : <Text>자기소개 없음</Text>}
                        <Text>{churchName}</Text>
                    </HeaderTextArea>
                </HeaderBox>

                <InfoArea>
                    <InfoTextBold>나이 : {member.age}</InfoTextBold>
                    <InfoTextBold>활동 지역 : </InfoTextBold>

                    {((member.location == null || member.location_ll == null) ||
                    (member.location_ll != null && member.location_ll.y == null && member.location_ll.x == null)) && 
                    // <PlusBtn text='지역 추가' onPress={() => {{navigation.navigate('SearchLocate', {setLocateProcess : setLocate, setRegionProcess : setRegion, navigation: navigation})}}}></PlusBtn>
                    <InfoText>아직 설정 안함</InfoText>}


                    {(member.location_ll != null &&
                    member.location_ll.x != null && member.location_ll.y != null) &&
                    (
                        <>
                        <InfoText>{member.location}</InfoText>
                        {isFocused && <DaumMap currentRegion={{
                            latitude: parseFloat(member.location_ll.y),
                            longitude: parseFloat(member.location_ll.x),
                            zoomLevel: 5,
                        }}
                            mapType={"Standard"}
                            style={{ width: 400, height: 400, backgroundColor: 'transparent' }}
                            
                            markers={[{
                                latitude: parseFloat(member.location_ll.y),
                                longitude: parseFloat(member.location_ll.x),
                                pinColor: "red",
                                pinColorSelect: "yellow",
                                title: "marker test",
                                draggable: false,
                                allClear: true,
                        }]}
                        /> }
                        </>
                    )}
                    <InfoTextBold>활동</InfoTextBold>
                    <ActivityRecordArea>
                        <InfoTextBold>소속 교회</InfoTextBold>
                        {member && memberChurch.map((data, index) => (
                            <GroupTile key={index} group={data} type='Church' isCurrentUser={member.id == userData.id} stackNavi={navigation} />
                        ))}
                        <InfoTextBold>소속 공동체</InfoTextBold>
                        {member && memberClub.map((data, index) => (
                            <GroupTile key={index} group={data} type='Club' isCurrentUser={member.id == userData.id} stackNavi={navigation} />
                        ))}
                        {memberClub.length == 0 && <InfoText>없음</InfoText>}
                        <InfoTextBold>참여한 번개</InfoTextBold>
                        {member && memberSpot.map((data, index) => (
                            <GroupTile key={index} group={data} type='Spot' isCurrentUser={member.id == userData.id} stackNavi={navigation} />
                        ))}
                        {memberSpot.length == 0 && <InfoText>없음</InfoText>}
                    </ActivityRecordArea>

                </InfoArea>

                
                {/* <CommonBtn onPress={() => {{navigation.navigate('SearchLocate', {setLocateProcess : setLocate, setRegionProcess : setRegion, navigation: route})}}}>
                        {/* <PlusText>+</PlusText> }
                        <Text>지역 수정</Text>
                        </CommonBtn> */}
                {/* <DaumMap currentRegion={{
                    latitude: parseFloat(100),
                    longitude: parseFloat(100),
                    zoomLevel: 5,
                }}
                    mapType={"Standard"}
                    style={{ width: 400, height: 400, backgroundColor: 'transparent' }}/> */}

            </ScrollView>
        }
        {userData == null && <Auth />}
        </>
    )
}



const ProfileStackNavi = ({tabNavi}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name={'ProfileMain'}
            children={({navigation}) => <ProfileMain navigation={navigation} tabNavi={tabNavi} />}        
        />
        <Stack.Screen
            name="ClubPage"
            component={ClubPage}
            options={{
                headerShown: false,
                headerBackTitleVisible: false,
                title: '소모임 상세보기'
            }}
        />
        <Stack.Screen
            name="SpotPage"
            component={SpotPage}
            options={{
                headerShown: false,
                headerBackTitleVisible: false,
                title: '번개 상세보기'
            }}
        />
        <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
                headerShown: true,
                headerBackTitleVisible: true,
                title: '프로필 수정'
            }}
        />
        <Stack.Screen
            name="ShowProfileImg"
            component={ShowProfileImg}
            options={{
                headerShown: false,
                headerBackTitleVisible: false,
                title: '프로필 크게보기'
            }}
        />
        <Stack.Screen
            name="SearchLocate"
            component={SearchLocate}
            options={{
                headerShown: true,
                headerBackTitleVisible: true,
                title: '지역 찾기',
            }}
        />
        <Stack.Screen
            name="EditChurmmunity"
            component={EditChurmmunity}
            options={{
                headerShown: true,
                headerBackTitleVisible: false,
                title: '새 모임',
            }}
        />
        <Stack.Screen
            name="SearchChurchPage"
            component={SearchChurchPage}
            options={{
                headerShown: true,
                headerBackTitleVisible: true,
                title: '교회 찾기',
            }}
        />
        <Stack.Screen
            name="ChurchView"
            component={ChurchView}
            options={{
                headerShown: true,
                headerBackTitleVisible: true,
                title: '교회 찾기',
            }}
        />
        <Stack.Screen
            name="AddChurchPage"
            component={AddChurchPage}
            options={{
                headerShown: true,
                headerBackTitleVisible: true,
                title: '교회 추가',
            }}
        />
        <Stack.Screen
            name="ChurchPage"
            component={ChurchPage}
            options={{
                headerShown: true,
                headerBackTitleVisible: true,
                title: '교회',
            }}
        />
      </Stack.Navigator>  
    );
}

const Profile = ({navigation}) => {
    return (
        <ProfileStackNavi tabNavi={navigation}/>
    )
};



export {Profile as default, ProfileMain} ;