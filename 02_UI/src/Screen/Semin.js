import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
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

const Semin = () => {
    const [isLogin, setIsLogin] = useState('');
    const [logInResult, setLogInResult] = useState(null);
    const [authInfo, setAuthInfo] = useState(null);
    const [logOutResult, setLogOutResult] = useState(null);

    useEffect(() => {
        getProfile();

        var hasLogInResult = (logInResult != null);
        if(hasLogInResult)
        {
            hasLogInResult = logInResult.refreshToken != null;
        }

        setIsLogin(hasLogInResult);
    },[])

    const signInWithKakao = async () => {
        const token = await login();
        setLogInResult(token);

        if(token!= null)
        {
             const profile = await getKakaoProfile();
             var temp = profile;

                    console.log(`profile : ${JSON.stringify(temp)}`);
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
      }
      catch(e)
      {
        //로그인페이지 노출
        console.log(e);
      }

      };

      const signOutWithKakao = async() => {
        const message = await logout();
        setLogInResult(null);
        setAuthInfo(null);
        setLogOutResult(message);
      };

    return (
      <Screen>
        <Body onPress={() =>
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
        </Body>
        <Body2 onPress={() => getProfile()}>
            {(logInResult != null && logInResult.scopes) && <Text>{logInResult.scopes[0]}</Text>}
            {(authInfo == null && <Text>{"need auth info"}</Text>)}
            {(authInfo != null && <Text>{authInfo.id}</Text>)}
        </Body2>
        <Body3 onPress={() => signOutWithKakao()}>
            {logInResult == null && <Text>{logOutResult}</Text>}
            {logInResult != null && <Text>{"is log in state"}</Text>}
        </Body3>

      </Screen>

    );
  };
  
  
  export default Semin;