import JoinPage from './JoinPage';
import Main from '~/Screen/02_Main/Main';
import { View, Text, Image } from 'react-native';
import Styled from 'styled-components/native';
import React, { useState, useEffect, useContext } from 'react';
import { DomainContext } from '~/Context/Domain';
import { UserData, KakaoAuthData, TryGetKakao } from '~/Context/User';
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
  //const [ tryGetKakao, setKakaoFlag] = useState(false); //카카오계정으로 회원 체크했다.
  const { tryGetKakao, setKakaoFlag } = useContext(TryGetKakao);
  
  const GetUser = (kakao_id) => {
    //console.log(kakao_id); //kakaoAuthData와 같음
    fetch(domain + '/Login/User/kakao/' + kakao_id).then(res => res.json()).then(res => 
      {
        setUserData(res[0]);
        setKakaoFlag(true);
        console.log(res[0]);
      });
}

//처음 진입 시 자동로그인.
useEffect(() => {
  //signOutWithKakao();
  autoLogin();
}, [])

//카카오 정보로 회원 정보 체크 후
useEffect(() => {
}, [tryGetKakao])

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
      console.log(e);
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
      {tryGetKakao == false && userData == null && <Screen>
        {authCheckFlag == false && <Image source={require(`~/Assets/Images/mainpray.jpg`)} />}
        {authCheckFlag && kakaoAuthData == null && <KaKaoBtn onPress={
          () => {
            signInWithKakao();
          }}>
          <Image source={require(`~/Assets/Images/kakao_login_medium_narrow.png`)} />
        </KaKaoBtn>}
      </Screen>}
      {tryGetKakao && userData == null && <JoinPage />}
      {tryGetKakao && userData != null && <Main />}
    </>
  );
};


export default AuthPage;