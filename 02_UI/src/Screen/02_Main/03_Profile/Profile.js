import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { UserData, KakaoAuthData, TryGetKakao, UserContextProvider } from '~/Context/User';
import Auth from '~/Screen/01_Auth/Auth';
import Styled from 'styled-components/native';
import { DomainContext } from '~/Context/Domain';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

const TestView = Styled.View`
    width: 100%;
    height: 50%;
`;

const ChangableStringData = Styled.View`
    flex-direction: row;
    width: 80%;
    height: 18%;
    //padding: 25px;
    margin: 0px 0px 3px 20% //상 우 하 좌
`;

const Input = Styled.TextInput`
background-color: yellow;
width: 60%;
border-bottom-width: 3px;
`;

const UserInfoChangeBtn = Styled.TouchableOpacity`
background-color: green;
width: 20%;
border-bottom-width: 3px;
`;

const ChangePhoto = Styled.TouchableOpacity`
height: 20%;
background-color: transparent;
margin: 0px 0px 10px 0px //상 우 하 좌
`

const Button = Styled.TouchableOpacity`
height: 25px;
width: 20%;
background-color: #FF0000;
align-items : center;
margin: 0px 0px 0px 80% //상 우 하 좌
`
const Profile = () => {
  const domain = useContext(DomainContext);
  const { userData, setUserData } = useContext(UserData);
  const { kakaoAuthData, setKakaoAuthData } = useContext(KakaoAuthData);
  const { tryGetKakao, setKakaoFlag } = useContext(TryGetKakao);
  const [logOutResult, setLogOutResult] = useState(null);
  const [imgSrc, setImgSrc] = useState(undefined);

  let [nickName, setNickName] = useState('');
  let [churchName, setChurchName] = useState('');
  
  /* react-native-image-picker 라이브러리 사용 옵션 */
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

  const NickNameTextHandler = (value) => {
    setNickName(value);
}

const ChurchNameTextHandler = (value) => {
    setChurchName(value);
}

  const signOutWithKakao = async () => {
    const message = await logout();
    setLogOutResult(message);

    //성공하면 auth호출해야함. 성공 실패 어캐구분?
    setUserData(null);
    setKakaoAuthData(null);
    setKakaoFlag(false);
  };

  const showCameraRoll = () => {
    launchImageLibrary(options, (response) => {
        if (response.error) {
            console.log('LaunchCamera Error: ', response.error);
        }
        else {
            console.log('ImageSrc: ' + JSON.stringify(response.assets));
            console.log('ImageSrc: ' + response.assets[0].uri);
            setImgSrc(response.assets[0]);
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
    });
}

const reqChangeUserInfo = (fetchHeader, changeType, changeValue) => {
    console.log(changeType, changeValue);
    console.log(userData.id);

    fetch(`${domain}/User/${userData.id}/${changeType}`, {
      method: 'PUT',
      body: changeValue,
      headers: fetchHeader
    }).then(res => res.json()).then(res => {
      alert(res);
    }).catch(e => {
      console.log("[ChangeFail]");
      console.log(e.json())
    });
  };

  return (
    <>
      {userData != null && <View>
        <Button style={{ width: '20%', height: '7%', resizeMode: 'contain', allign: 'flex-end' }} onPress={() => signOutWithKakao()}>
          <Text>Logout</Text>
        </Button>

        <ChangePhoto onPress={() => {showCameraRoll();}}>
           <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: userData.photo }} />
        </ChangePhoto>

        <TestView>
          <ChangableStringData>
            <Input
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={userData.name}
              returnKeyType="done"
              onChangeText={NickNameTextHandler}
              value={nickName}
            />

            <UserInfoChangeBtn onPress={() => reqChangeUserInfo({'Content-Type': 'application/json'},"name", JSON.stringify({ data: nickName}))}>
              <Text> Name Change </Text>
            </UserInfoChangeBtn>
          </ChangableStringData>

          <ChangableStringData>
            <Input
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={userData.church}
              returnKeyType="done"
              onChangeText={ChurchNameTextHandler}
              value={churchName}
            />

            <UserInfoChangeBtn onPress={() => reqChangeUserInfo({'Content-Type': 'application/json'}, "church", JSON.stringify({ data: churchName}))}>
              <Text> Curch Change </Text>
            </UserInfoChangeBtn>
          </ChangableStringData>
        </TestView>
      </View>}

      {userData == null && kakaoAuthData == null && tryGetKakao == false && <Auth />}
    </>
  );
};


export default Profile;