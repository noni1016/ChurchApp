import JoinPage from './JoinPage';
import Main from '~/Screen/02_Main/Main';
import { View, Text, Image } from 'react-native';
import Styled from 'styled-components/native';
import React, { useState, useEffect, useContext } from 'react';
import { DomainContext } from '~/Context/Domain';
import { UserData, KakaoAuthData, TryGetUserData } from '~/Context/User';
import { KakaoOAuthToken, KakaoProfile, getProfile as getKakaoProfile,  login, logout, unlink, } from '@react-native-seoul/kakao-login';

const Screen = Styled.View`
    flex-direction: column;
    flex: 1;
    align-items : center;
    justify-content: center;
`;

const AuthScreen = Styled.View`
`;

const KaKaoBtn = Styled.TouchableOpacity`

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

const AuthPage = () => {
  const domain = useContext(DomainContext);
  const { userData, setUserData } = useContext(UserData) //카카오 id를 통해 가져온 앱 회원 정보
  const { kakaoAuthData, setKakaoAuthData } = useContext(KakaoAuthData) //로그인 하여 가져온 카카오 계정정보
  
  const [ authCheckFlag, setAuthCheckFlag ] = useState(false); //카카오 로그인시도했음
  const { tryGetUserData, setTryGetUserDataFlag } = useContext(TryGetUserData); //카카오 계정으로 철취앱 회원정보 조회 시도함
  
  const GetUser = (kakao_id) => {
    fetch(domain + '/User/Domain/kakao/' + kakao_id).then(res => res.json()).then(res => {
      let resultCount = Object.keys(res).length; //회원정보가 있다면 res가 0이 아닐것
      setTryGetUserDataFlag(true);

      if(resultCount != 0)
      {
        let userInfo = res[0];
        console.log(res);
        console.log(userInfo);
  
        userInfo.photo = res[0].photo; //domain + '/' + res[0].photo;
        setUserData(userInfo);
  
  
        console.log("[AutoLogin]");
        console.log(userInfo);
        console.log("[=========]");
      }
    });
  }

//처음 진입 시 자동로그인.
useEffect(() => {
  //signOutWithKakao();
  autoLogin();
}, [])

//카카오 정보로 회원 정보 체크 후
useEffect(() => {
}, [tryGetUserData])

  //앱실행 후 자동로그인
  const autoLogin = async () => {
    console.log("getProfile");
    try {
      //카카오 계정정보 가져오기.
      const profile = await getKakaoProfile();
      setKakaoAuthData(profile);
      GetUser(profile.id);
    }
    catch (e) {
      //카카오 로그인페이지 노출
      setKakaoAuthData(null);
    }

    setAuthCheckFlag(true);
  };

  //버튼눌러서 직접 로그인
  const signInWithKakao = async () => {
    const token = await login();
    console.log(token);
    //setLogInResult(token);
    if (token != null) {
      const profile = await getKakaoProfile();
      setKakaoAuthData(profile);
      GetUser(profile.id);
      setAuthCheckFlag(true);
    }
  };

  const signOutWithKakao = async () => {
    const message = await logout();
    setLogOutResult(message);

    setUserData(null);
    setKakaoAuthData(null);
    authCheckFlag(false);
  };

  return (
    <>
      {tryGetUserData == false && userData == null && <Screen>
        {authCheckFlag == false && <Image source={require(`~/Assets/Images/mainpray.jpg`)} />}
        {authCheckFlag && kakaoAuthData == null && <KaKaoBtn onPress={
          () => {
            signInWithKakao();
          }}>
          <Image source={require(`~/Assets/Images/kakao_login_medium_narrow.png`)} />
        </KaKaoBtn>}
      </Screen>}
      {tryGetUserData && userData == null && <JoinPage />}
      {tryGetUserData && userData != null && <Main />}
    </>
  );
};


export default AuthPage;