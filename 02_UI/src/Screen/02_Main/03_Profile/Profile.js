import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { UserData, KakaoAuthData, TryGetKakao, UserContextProvider } from '~/Context/User';
import Auth from '~/Screen/01_Auth/Auth';
import Styled from 'styled-components/native';
import { DomainContext } from '~/Context/Domain';
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

  let [nickName, setNickName] = useState('');
  let [churchName, setChurchName] = useState('');
  
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

  const reqChangeUserInfo = (changeType, changeValue) => {
    console.log(changeType, changeValue);
    console.log(userData.id);

    fetch(`${domain}/User/${userData.id}/${changeType}`, {
      method: 'PUT',
      body: JSON.stringify({ data: changeValue}),
      headers: { 'Content-Type': 'application/json' }
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

        <ChangePhoto onPress={() => console.log(userData.photo)}>
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

            <UserInfoChangeBtn onPress={() => reqChangeUserInfo("name", nickName)}>
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

            <UserInfoChangeBtn onPress={() => reqChangeUserInfo("church", churchName)}>
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