//필수 입력사항.
//1. 닉네임 - default는 카카오 닉네임. 수정가능 중복확인
//2. 사는지역 나중에 지피에스 연동
//3. 다니는 교회 입력 - 교인인증필요.. 어떻게
//4. 확인

import React, {useState, useContext, useEffect} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent, Button } from 'react-native';
import Styled from 'styled-components/native';
import AddBtn from '~/Components/AddBtn'
import { UserAuthChecker, UserAuthCheckFlag, UserContextProvider } from '~/Context/User';
import AuthPage from './Auth';
import { DomainContext } from '~/Context/Domain';

const Input = Styled.TextInput`
    width: 50%;
    height: 15%;
    background-color: yellow;
    //padding: 25px;
    margin: 35px 0px 0px 25px; //상 우 하 좌
    border-bottom-width: 10px;
`;

const NickNameCheckBtn = Styled.TouchableOpacity`
height: 100px;
width: 200px;
background-color: green;
`

const JoinBtn = Styled.TouchableOpacity`
width: 50%;
height: 15%;
background-color: #ff000055;
// background-color: transparent;
`

const JoinPage = () => {
    const domain = useContext(DomainContext);
    const { authChecker, setAuthChecker } = useContext(UserAuthChecker);

    let [nickName, setNickName] = useState('');
    let [churchName, setChurchName] = useState('');
    
    function zzz(authChecker)
    {
        return authChecker.getAuthInfo();
    }
    const NickNameTextHandler = (value) => {
        setNickName(value);
    }

    const ChurchNameTextHandler = (value) => {
        setChurchName(value);
    }

    const CheckNickName = () => {
        
    }

    const JoinUser = () => {
        console.log(authChecker.authInfo);
        let sendCommentUserData = {name: nickName, photo: authChecker.authInfo.profileImageUrl, church : churchName, age : 10, level : 99, role :0, id_domain : authChecker.authInfo.id};
        console.log(sendCommentUserData);
        fetch(domain + '/Login/User/kakao', {
            method: 'POST',
            body: JSON.stringify(sendCommentUserData),
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            console.log(res)
            //로그인
        });
        // console.log('FeedComment!!!!', feedComments.length);
    }

    return (
    <View>
      
        <Text>회원가입</Text>
        <Input 
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder= {authChecker.authInfo.nickname}
                        returnKeyType="done"
                        onChangeText={NickNameTextHandler}
                        value={nickName}
                        // onSubmitEditing={({nativeEvent}) => {
                        //     AddInput(nativeEvent.text);
                        // }}
                    />          
      <Input 
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="교회 추가"
                        returnKeyType="done"
                        onChangeText={ChurchNameTextHandler}
                        value={churchName}
                        //onSubmitEditing={({nativeEvent}) => {
                        //    AddInput(nativeEvent.text);
                        //}}
                    />     

        <JoinBtn onPress = {() => 
        {
            JoinUser();
        }}>
        </JoinBtn>     

    </View>

    
    )
};

//1. 카카오 계정id 보내면 그걸로 만들어진 유정정보 내놓기
//2. 없으면 회원가입 하게 하기
//3. 해 줘

export default JoinPage;