import React, {useState, useEffect, useContext} from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {KakaoAuthData, UserData, TryGetUserData} from '~/Context/User';
import {launchImageLibrary} from 'react-native-image-picker';

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


const EditProfile = ({navigation}) => {
    const domain = useContext(DomainContext);
    const {userData, setUserData} = useContext(UserData);
    const [imgSrc, setImgSrc] = useState('');
    const [reload, setReload] = useState(false);
    let fetchHeader = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    }

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

    return (
        <ScrollView style={{paddingVertical: 20, paddingHorizontal: 10, backgroundColor: 'transparent'}}>
            <ChangePhotoArea>
                <ProfileImgBtn onPress={() => {navigation.navigate('ShowProfileImg')}}>
                    <ProfileImg style={{resizeMode: 'contain'}} source={{ uri: `${domain}/Profile/${userData.photo}` + "?cache="+Math.random() }}/>
                </ProfileImgBtn>
                <ProfileImgChangeBtn onPress={() => showCameraRoll()}><Text>프로필 사진 선택</Text></ProfileImgChangeBtn>
                <ProfileImgToDefaultBtn onPress={() => changeProfileImgToDefault()}><Text>기본 이미지로 변경</Text></ProfileImgToDefaultBtn>
            </ChangePhotoArea>            

        </ScrollView>
    )
}

export default EditProfile;