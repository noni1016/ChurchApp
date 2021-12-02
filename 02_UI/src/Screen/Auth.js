import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image} from 'react-native';
import Styled from 'styled-components/native';
import {UserAuthChecker, UserContextProvider} from '~/Context/User';

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
    const {authChecker, setAuthChecker} = useContext(UserAuthChecker);
    const [isLogin, setIsLogin] = useState(''); //로그인 토큰이 있음
    const [logInResult, setLogInResult] = useState(null); //토큰을 사용해 로그인 함
    const [authInfo, setAuthInfo] = useState(null); //로그인 하여 가져온 계정정보
    const [logOutResult, setLogOutResult] = useState(null);

    useEffect(() => {
        getProfile();

        console.log(`========== : ${authChecker}`);
        var hasLogInResult = (logInResult != null);
        if(hasLogInResult)
        {
            hasLogInResult = logInResult.refreshToken != null;
        }
        setIsLogin(hasLogInResult);

    }, [])

    const signInWithKakao = async () => {
        const token = await login();
        setLogInResult(token);

        if(token!= null)
        {
             const profile = await getKakaoProfile();
             var temp = profile;

             console.log(`profilerrrrrrrrrrr : ${JSON.stringify(temp)}`);
             setAuthInfo(profile);

        }
      };

      const getProfile = async () => {
      console.log("getProfile");
      try
      {
            const profile = await getKakaoProfile();
            console.log(`profile : ${profile}`);
            setAuthInfo(profile);

            //프로필 정보 가져온 후 계정 불러오기
        if(isLogin == true)
        {
        }
        else
        {
            setAuthInfo(null);
        }
        setAuthChecker(true);
      }
      catch(e)
      {
        //로그인페이지 노출
        setAuthChecker(false);
        console.log(e);
      }

      };

      const signOutWithKakao = async() => {
        const message = await logout();
        setLogInResult(null);
        setAuthInfo(null);
        setLogOutResult(message);
        setAuthChecker(false);

      };

    return (
      <Screen>
        {authChecker == false && <AuthScreen>
            <KaKaoBtn onPress={() =>
                {
                    if(isLogin)
                    {
                        console.log("already log in");
                    }
                    else
                    {
                        signInWithKakao();
                    }
                }}>
            <Image source = {require(`~/Assets/Images/kakao_login_medium_narrow.png`)}/>
            </KaKaoBtn>
         </AuthScreen>}

            <Body3 onPress={() => signOutWithKakao()}>
                        {logInResult == null && <Text>{logOutResult}</Text>}
                        {logInResult != null && <Text>{"is log in state"}</Text>}
                    </Body3>
      </Screen>

    );
  };


  export default AuthPage;