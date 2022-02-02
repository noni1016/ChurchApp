import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import Styled from 'styled-components/native';
import { UserData, UserAuthChecker, UserAuthCheckFlag, UserContext, UserContextProvider } from '~/Context/User';
//import JoinPage from './JoinPage';

import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import { DomainContext } from '~/Context/Domain';
import JoinPage from './JoinPage';

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
  const { authChecker, setAuthChecker } = useContext(UserAuthChecker);
  const { authCheckFlag, setAuthCheckFlag } = useContext(UserAuthCheckFlag);
  const { currentUserData, setUserData} = useContext(UserData)
  const [isLogin, setIsLogin] = useState(''); //로그인 토큰이 있음
  const [logInResult, setLogInResult] = useState(null); //토큰을 사용해 로그인 함
  const [authInfo, setAuthInfo] = useState(null); //로그인 하여 가져온 계정정보
  const [logOutResult, setLogOutResult] = useState(null);
  const [tryGetKakao, setKakaoFlag] = useState(false);
  const [kakaoProfile, setKakaoProfile] = useState(null);

  const GetUser = (kakao_id) => {
    console.log(kakao_id);
    fetch(domain + '/Login/User/kakao/' + kakao_id).then(res => res.json()).then(res => 
      {
        setUserData(res[0]);
        setKakaoFlag(true);
      });
    
    
    // console.log('FeedComment!!!!', feedComments.length);
}

useEffect(() => {

  if(tryGetKakao == false)
  {
    return;
  }

  console.log("use effect");
  if(currentUserData == null)
  {
    console.log("is null");
    //회원가입 페이지 가야하나
    
    
  }
  else
  {
    console.log(currentUserData);
    
  }

  setAuthChecker({checkFlag : true, authInfo : kakaoProfile});
  setAuthCheckFlag(true);
  //여기서 카카오 인증 데이터로 뭔가 썸띵 체크를 하면 될듯

}, [tryGetKakao])

  useEffect(() => {
    getProfile();

    console.log(`========== : ${authChecker}`);
    var hasLogInResult = (logInResult != null);
    if (hasLogInResult) {
      hasLogInResult = logInResult.refreshToken != null;
    }
    setIsLogin(hasLogInResult);
  }, [])

  const signInWithKakao = async () => {
    const token = await login();
    setLogInResult(token);

    if (token != null) {
      const profile = await getKakaoProfile();
      var temp = profile;

      console.log(`profilerrrrrrrrrrr : ${JSON.stringify(temp)}`);
      setAuthInfo(profile);
      setAuthChecker({checkFlag : true, authInfo : profile});
      setAuthCheckFlag(true);
    }
  };

  const getProfile = async () => {
    console.log("getProfile");
    try {
      const profile = await getKakaoProfile();
      //카카오 id값으로 유저정보 들고오기.

      setKakaoProfile(profile);
      GetUser(profile.id);
      //GetUser(4);
      //프로필 정보 가져온 후 계정 불러오기
      
      //setAuthChecker({checkFlag : true, authInfo : profile});
      return;
      if (isLogin == true) {
        setAuthInfo(profile);
        
        console.log(`id: ${profile.id}`);
        var kakao_id = 4; //profile.id;
        //DB요청
        fetch(domain + `/Login/User/Kakao/${kakao_id}`).then(res => res.json()).then(res => {

          if (res.length != 0) {
            console.log(res.length);
            console.log(res[0].id);
            console.log(res[0].name);
          }
          else {
            //회원가입 페이지 연결
            console.log('no data');
          }
        }
        );
      }
      else {
        setAuthInfo(null);
      }
      setAuthChecker({checkFlag : true, authInfo : profile});
    }
    catch (e) {
      //로그인페이지 노출
      setAuthChecker({checkFlag : false, authInfo : profile});
      console.log(e);
    }
    //setAuthCheckFlag(true);
  };

  const signOutWithKakao = async () => {
    const message = await logout();
    setLogInResult(null);
    setAuthInfo(null);
    setLogOutResult(message);
    setAuthChecker({checkFlag : false, authInfo : profile});
  };

  return (
    <Screen>
        {/* // <JoinPage>

        // </JoinPage> */}
      
      
      {authCheckFlag && authChecker == false && <AuthScreen>
        <KaKaoBtn onPress={() => {
          if (isLogin) {
            console.log("already log in");
          }
          else {
            signInWithKakao();
          }
        }}>
          <Image source={require(`~/Assets/Images/kakao_login_medium_narrow.png`)} />
        </KaKaoBtn>
      </AuthScreen>}

      {/* <Body3 onPress={() => signOutWithKakao()}>
                        {logInResult == null && <Text>{logOutResult}</Text>}
                        {logInResult != null && <Text>{"is log in state"}</Text>}
                    </Body3> */}

    </Screen>

  );
};


export default AuthPage;