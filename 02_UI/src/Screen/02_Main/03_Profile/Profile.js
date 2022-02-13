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

const Screen = Styled.View`
    flex-direction: column;
    flex: 1;
    align-items : center;
    justify-content: center;
`;

const Body = Styled.TouchableOpacity`

`;

const Body2 = Styled.TouchableOpacity`
height: 100px;
width: 200px;
background-color: #0000FF;
`

const Body3 = Styled.TouchableOpacity`
height: 100px;
width: 100px;
background-color: #FF0000;
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
      {userData != null && <Screen>
        <Body onPress={() => {
          // if (isLogin) {
          //   console.log("already log in");
          // }
          // else {
          //   signInWithKakao();
          // }
        }}>
          <Image source={require(`~/Assets/Images/kakao_login_medium_narrow.png`)} />
        </Body>
        
        <Text>{userData.id}</Text>
        
        <Body3 onPress={() => signOutWithKakao()}>
          
        </Body3>
      </Screen>}
      {userData == null && kakaoAuthData == null  && tryGetKakao == false && <Auth/>}
    </>
  );
};


export default Profile;