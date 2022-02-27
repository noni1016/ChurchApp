import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { UserData, KakaoAuthData, TryGetKakao, UserContextProvider } from '~/Context/User';
import Auth from '~/Screen/01_Auth/Auth';
import Styled from 'styled-components/native';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

const ChangePhoto = Styled.TouchableOpacity`
height: 100px;
width: 100px;
background-color: transparent;
align-items : center;
margin: 0px 0px 0px 25px; //상 우 하 좌
`

const Button = Styled.TouchableOpacity`
height: 25px;
width: 70px;
background-color: #FF0000;
align-items : center;
margin: 0px 0px 0px 25px; //상 우 하 좌
`

//로그아웃 로직 빼고 지울거임
const Profile = () => {
  const { userData, setUserData } = useContext(UserData);
  const { kakaoAuthData, setKakaoAuthData } = useContext(KakaoAuthData);
  const { tryGetKakao, setKakaoFlag } = useContext(TryGetKakao);
  const [logOutResult, setLogOutResult] = useState(null);

  const signOutWithKakao = async () => {
    const message = await logout();
    setLogOutResult(message);

    //성공하면 auth호출해야함. 성공 실패 어캐구분?
    setUserData(null);
    setKakaoAuthData(null);
    setKakaoFlag(false);
  };

  return (
    <>
      {userData != null && <View>
        <Text>{userData.name}</Text>
        <Text>{userData.church}</Text>
        
        <ChangePhoto onPress={() => console.log(userData.photo)}>
           <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: userData.photo }} />
        </ChangePhoto>

        <Button onPress={() => signOutWithKakao()}>
          <Text>Logout</Text>
        </Button>
      </View>}

      {userData == null && kakaoAuthData == null && tryGetKakao == false && <Auth />}
    </>
  );
};


export default Profile;