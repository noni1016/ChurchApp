import React, {useState} from 'react';
import {Text} from 'react-native';
import Styled from 'styled-components/native';
import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    unlink,
  } from '@react-native-seoul/kakao-login';

  const Body = Styled.TouchableOpacity`
  height: 100px;
  width: 100px;
  background-color: #00FF00;
`;

const Semin = () => {
    const [result, setResult] = useState('');

    const signInWithKakao = async () => {
        const token = await login();
    
        setResult(JSON.stringify(token));
      };

    return (
        <Body onPress={() => signInWithKakao()}>
            <Text>{result}</Text>
        </Body>
        
    );
  };
  
  
  export default Semin;