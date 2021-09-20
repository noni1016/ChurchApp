import React, {useState} from 'react';
import {View, Text} from 'react-native';
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
  height: 300px;
  width: 300px;
  background-color: #00FF00;
`;

const Body2 = Styled.TouchableOpacity`
height: 300px;
width: 300px;
background-color: #0000FF;
`

const Body3 = Styled.TouchableOpacity`
height: 300px;
width: 300px;
background-color: #FF0000;
`
const Semin = () => {
    const [result1, setResult1] = useState('');
    const [result2, setResult2] = useState('');
    const [result3, setResult3] = useState('');

    const signInWithKakao = async () => {
        const token = await login();
    
        setResult1(JSON.stringify(token));
        // console.log(result);
      };

      const getProfile = async () => {
        const profile = await getKakaoProfile();
      
        setResult2(JSON.stringify(profile));
        // console.log(result);
      };

      const signOutWithKakao = async() => {
        const message = await logout();
      
        setResult3(message);
      };

    return (
      <View>
        <Body onPress={() => signInWithKakao()}>
            <Text>{result1}</Text>
        </Body>
        <Body2 onPress={() => getProfile()}>
            <Text>{result2}</Text>
        </Body2>
        <Body3 onPress={() => signOutWithKakao()}>
            <Text>{result3}</Text>
        </Body3>
      </View>
        
    );
  };
  
  
  export default Semin;