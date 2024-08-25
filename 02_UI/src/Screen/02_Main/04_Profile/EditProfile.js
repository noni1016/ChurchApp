import React, {useState, useEffect, useContext} from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {KakaoAuthData, UserData, TryGetUserData} from '~/Context/User';
import {launchImageLibrary} from 'react-native-image-picker';
import PlusBtn from '~/Components/PlusBtn';
import { useIsFocused } from '@react-navigation/native';
import RectangleBtn from '~/Components/RectangleBtn';
import {logout} from '@react-native-seoul/kakao-login';
import DaumMap from '../../03_Map/DaumMapController';

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

const InfoTextBold = styled.Text`
    font-size: 20px;
    font-family: 'DoHyeon-Regular';   
    margin-top: 5px;
    margin-bottom: 5px;
    height: 30px;
`;

const ChangePhotoArea = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background-color: transparent;
    margin: 0px 10px 0px 0px;
 `;

const ProfileImgBtn = styled.TouchableOpacity`
    flex: 1;
    background-color: transparent;
    border-radius: 5px;
    border-color: black;
    border-width: 3px;
    margin: 5px;
`;

 const ProfileImg = styled.Image`
    width: 100%;
    height: 100px;
    background-color: transparent;
 `;

const ProfileImgChangeBtn = styled.TouchableOpacity`
    flex: 1;
    background-color: transparent;
    align-items: center;
    border-width: 3px;
    margin: 5px;
`;

const ProfileImgToDefaultBtn = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    background-color: transparent;
    border-width: 3px;
    margin: 5px;
`;

const TitleInput = styled.TextInput`
    width: 90%;
    background-color: transparent;
    padding: 5px;
    margin: 10px 10px 10px 20px; //상 우 하 좌
    font-size: 18px;
    color: black;
    border-width: 2px;
    height: 50px;
`;

const DescInput = styled.TextInput`
    width: 90%;
    height: 200px;
    border-width: 2px;
    border-color: black;
    background-color: transparent;
    padding: 5px;
    margin: 10px 10px 10px 20px; //상 우 하 좌
    font-size: 18px;
    text-align-vertical: top;
`;

const EditProfile = ({navigation}) => {
    const domain = useContext(DomainContext);
    const {userData, setUserData, userClub, userSpot} = useContext(UserData);
    const {kakaoAuthData, setKakaoAuthData} = useContext(KakaoAuthData);
    const {setTryGetUserDataFlag} = useContext(TryGetUserData);
    const isFocused = useIsFocused();
    const [imgSrc, setImgSrc] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [reload, setReload] = useState(false);
    // const [content, setContent] = useState({...userData, location_ll: {x: null, y: null}});
    const [content, setContent] = useState(userData);
    const [locate, setLocate] = useState([0,0]);
    const [region, setRegion] = useState('');
    let fetchHeader = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    }

    useEffect(() => {
        setImgUrl(`${domain}/Profile/${userData.photo}` + "?cache="+Math.random());
    }, [userData])

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
      

            reqChangeUserInfo(fetchHeader, "photo", imageData)
          }
    }, [imgSrc])

    useEffect(() => {
        if(region != '')
        {
            setContent((current) => 
            {
                let newContent = {...current}; 
                newContent.location = region; 
                return newContent
            })
        }
    }, [region])

    useEffect(() => {
        if(locate[0] != 0 && locate[1] != 0)
        {
            setContent((current) => 
            {
                let newContent = {...current}; 
                newContent.location_ll.x = locate[0]; 
                newContent.location_ll.y = locate[1];
                return newContent
            })
        }
    }, [locate])

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

    const changeProfileImgToDefault = () => {
        let fetchReq = `${domain}/User/${userData.id}/photo/default`;
        console.log('changeProfileImgToDefault')
        console.log(fetchReq)
        fetch(fetchReq).then(res => res.json()).then(res => {
            console.log(res);
            if (res.id) setUserData(res);
        });
        setReload(!reload);
    };

    const signOutWithKakao = async() => {
        const message = await logout();
        // setLogOutResult(message);
        console.log("signOut");
        setUserData(null);
        setTryGetUserDataFlag(false);
        setKakaoAuthData(null);
    }

    const withdrawal = () => {
        // Check if the user have a group with leader
        // let isLeaderOfGroup = false;
        
        for (i = 0; userClub.length; i++) {
            if (userClub[i].leader == userData.id) {
                alert('공동체의 리더는 먼저 리더를 변경한 후 탈퇴할 수 있습니다. 리더인 공동체에서 리더를 변경해주세요.');
                return;
            }
        }

        for (i = 0; userSpot.length; i++) {
            if (userSpot[i].leader == userData.id) {
                alert('공동체의 리더는 먼저 리더를 변경한 후 탈퇴할 수 있습니다. 리더인 공동체에서 리더를 변경해주세요.');
                return;
            }
        }

        // Delete user info from database
        fetch(`${domain}/User/${userData.id}`, {method: 'DELETE', headers: {'Content-Type': 'application/json'}}).then(res=>res.json()).then((res) => alert(`Delete User ${res}`));
        // LogOut
        signOutWithKakao();
    }

    const putProfile = () => {
        // Check inputs
        if (content.name == '') {
            alert('이름을 입력해주세요');
            return;
        // } else if (content.church == null) {
        //     alert('출석 교회를 입력해주세요');
        //     return;
        } else if (content.location == '') {
            alert('활동 지역을 설정해 주세요');
            return;
        }
        sendUserInfo();
    }

    const sendUserInfo = () => {
        console.log(content);
        fetch(`${domain}/User/${userData.id}`, {
            method: 'PUT',
            body: JSON.stringify({name: content.name, church: 1, description: content.description, location: content.location, location_ll_x: content.location_ll.x, location_ll_y: content.location_ll.y}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json()).then(res => {console.log(res); setUserData(res); navigation.goBack();});
    }

    return (
        <ScrollView style={{paddingVertical: 20, paddingHorizontal: 10, backgroundColor: 'transparent'}}>
            <ChangePhotoArea>
                <ProfileImgBtn onPress={() => {navigation.navigate('ShowProfileImg')}}>
                    <ProfileImg style={{resizeMode: 'contain'}} source={{ uri: imgUrl }}/>
                </ProfileImgBtn>
                <ProfileImgChangeBtn onPress={() => showCameraRoll()}><Text>프로필 사진 선택</Text></ProfileImgChangeBtn>
                <ProfileImgToDefaultBtn onPress={() => changeProfileImgToDefault()}><Text>기본 이미지로 변경</Text></ProfileImgToDefaultBtn>
            </ChangePhotoArea>            
            <InfoTextBold>이름</InfoTextBold>
            <TitleInput placeholderTextColor="gray" maxLength={20} value={content.name} placeholder={'최대 20자'} onChangeText={(v)=>{setContent((current) => {let newContent = {...current}; newContent.name = v; return newContent})}}/>
            <InfoTextBold>교회</InfoTextBold>
            <RectangleBtn color='skyblue' text='교회찾기' onPress={() => navigation.navigate('SearchChurchPage', {navigation: navigation})} />
            <InfoTextBold>활동 지역</InfoTextBold>
            {((content.location == null || content.location_ll == null) ||
            (content.location_ll != null && content.location_ll.y == null && content.location_ll.x == null)) && 
            <PlusBtn text='지역 추가' onPress={() => {{navigation.navigate('SearchLocate', {setLocateProcess : setLocate, setRegionProcess : setRegion, navigation: navigation})}}}></PlusBtn>}
            {(content.location_ll != null && 
            (content.location_ll.x != null && content.location_ll.y != null)) && (
            <>
                <Text>{content.location}</Text>
               {isFocused && <DaumMap currentRegion={{
                latitude: parseFloat(content.location_ll.y),
                longitude: parseFloat(content.location_ll.x),
                zoomLevel: 5,
               }}
                mapType={"Standard"}
                style={{ width: 400, height: 400, backgroundColor: 'transparent' }}
                
                markers={[{
                    latitude: parseFloat(content.location_ll.y),
                    longitude: parseFloat(content.location_ll.x),
                    pinColor: "red",
                    pinColorSelect: "yellow",
                    title: "marker test",
                    draggable: false,
                    allClear: true,
               }]}
               />} 
            </>)}
            <InfoTextBold>소개</InfoTextBold>
            <DescInput
                multiline
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="공동체에 나를 표현해줄 한마디!"
                returnKeyType="done"
                maxLength={200}
                onChangeText={(v) => {setContent((current) => {let newContent = {...current}; newContent.description = v; return newContent})}}
                value={content.description}
                color="black" placeholderTextColor="gray"
            />
            <RectangleBtn color='green' text='정보 업데이트' onPress={() => putProfile()} />
            <RectangleBtn color='blue' text='로그아웃' onPress={() => signOutWithKakao()} />
            <RectangleBtn color='red' text='계정 삭제' onPress={() => withdrawal()} />
        </ScrollView>
    )
}

export default EditProfile;