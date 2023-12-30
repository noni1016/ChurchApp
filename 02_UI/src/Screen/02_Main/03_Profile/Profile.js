import React, {useState, useEffect, useContext} from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {KakaoAuthData, UserData, TryGetUserData} from '~/Context/User';
import {
    createStackNavigator,
} from '@react-navigation/stack';

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

import {launchImageLibrary} from 'react-native-image-picker';
import DaumMap from './../../03_Map/DaumMapController';

import { useIsFocused } from '@react-navigation/native';

import PlusBtn from '~/Components/PlusBtn';

import RectangleBtn from '~/Components/RectangleBtn';

import {logout} from '@react-native-seoul/kakao-login';

import Auth from '~/Screen/01_Auth/Auth';


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
    background-color: yellow;
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
    background-color: green;
    margin-left: 5%;
`;

const ProfileMain = ({navigation, route}) => {
    const domain = useContext(DomainContext);
    const {userData, setUserData} = useContext(UserData);
    const [member, setMember] = useState(route ? route.params.member : userData);
    const [imgSrc, setImgSrc] = useState('');
    const [locate, setLocate] = useState([0,0]);
    const [region, setRegion] = useState('');
    const [userImgUrl, setUserImgUrl] = useState(`${domain}/Profile/Jesus.png`);
    const isFocused = useIsFocused();
    const {kakaoAuthData, setKakaoAuthData} = useContext(KakaoAuthData);
    const {tryGetUserData, setTryGetUserDataFlag} = useContext(TryGetUserData);
    
    useEffect(() => {
        setMember(route != undefined ? route.params.member : userData);
    }, [])

    useEffect(() => {
        console.log('[useEffect: userData]')
        console.log(userData);
        setUserImgUrl(`${domain}/Profile/${userData.photo}` + "?cache="+Math.random());
    }, [userData])

    const signOutWithKakao = async() => {
        const message = await logout();
        // setLogOutResult(message);
        console.log("signOut");
        setUserData(null);
        setKakaoAuthData(null);
        setTryGetUserDataFlag(false);
    }

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
                        {userData.id == member.id && <Icon1 name="settings-outline" size={26} onPress={() => alert('프로필 수정')} />}
                    </HeaderButtonsContainer>
                )
            });
        }


    }, [member])

    useEffect(() => {
        console.log(imgSrc)
        if (imgSrc)
        {
            console.log("=====photo change=====");
            console.log(imgSrc.uri);
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


    // Camera Roll
 const showCameraRoll = () => {
    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            alert('프사변경취소');
            return;
        }
        if (response.error) {
            console.log('LaunchCamera Error: ', response.error);
            return;
        }
        if (response.assets.length > 0) {
            setImgSrc(response.assets[0]);
            return;
        }
        alert('프사변경취소');
    });
}

const reqChangeUserInfo = (fetchHeader, changeType, changeValue) => {
    console.log(changeType, changeValue);
    console.log(userData);
    let fetchUrl = `${domain}/User/${userData.id}/${changeType}`;
    console.log(fetchUrl);
    
    fetch(fetchUrl, {
      method: 'PUT',
      body: changeValue,
      headers: fetchHeader
    }).then(res => res.json()).then(res => {
        console.log('[query result]');
        console.log(res);
        if (res.id) {
            setUserData(res);
        }
    }).catch(e => {
      alert('프로필 사진 변경에 실패하였습니다.');
      console.log("[ChangeFail]");
      console.log(e);
    });
  };

    return (
        <>
            {
                userData &&
                <ScrollView style={{padding: 10}}>
                <HeaderBox>
                <ChangePhoto onPress={() => {showCameraRoll();}}>
                    <Image style={{ width: 70, height: 70, flex: 1, resizeMode: 'contain' }} source={{ uri: userImgUrl }}/>
                </ChangePhoto>

                <HeaderTextArea style={{ flex: 3 }}>
                        <Text style={{ fontWeight: 'bold'}}>{member.name}</Text>
                        {member.description ? <Text>{member.description}</Text> : <Text>자기소개 없음</Text>}
                        <Text>{member.church}</Text>
                    </HeaderTextArea>
                </HeaderBox>

                <InfoArea>
                    <InfoTextBold>나이 : 만 {member.age} 세</InfoTextBold>
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
                    <InfoTextBold>활동 기록</InfoTextBold>
                    <ActivityRecordArea>
                        <InfoTextBold>소속 공동체</InfoTextBold>
                        <InfoText>여기에 소속 공동체와 참여한 번개를 넣는게 좋을까요?</InfoText>
                        <InfoTextBold>참여한 번개</InfoTextBold>
                    </ActivityRecordArea>

                </InfoArea>
                <RectangleBtn color='blue' text='로그아웃' onPress={() => signOutWithKakao()}/>
                <RectangleBtn color='red' text='계정 삭제' onPress={() => alert('계정 삭제')}/>

                
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

      </Stack.Navigator>  
    );
}

const Profile = ({navigation}) => {
    return (
        <ProfileStackNavi tabNavi={navigation}/>
    )
};



export {Profile as default, ProfileMain} ;