//필수 입력사항.
//1. 닉네임 - default는 카카오 닉네임. 수정가능 중복확인
//2. 사는지역 나중에 지피에스 연동
//3. 다니는 교회 입력 - 교인인증필요.. 어떻게
//4. 확인

import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent, Button } from 'react-native';
import Styled from 'styled-components/native';
import AddBtn from '~/Components/AddBtn'
import { UserData, KakaoAuthData, UserContextProvider } from '~/Context/User';
import { DomainContext } from '~/Context/Domain';
import Main from '~/Screen/02_Main/Main';
import Styles from '~/Style';

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
`;

const JoinBtn = Styled.TouchableOpacity`
width: 50%;
height: 15%;
background-color: red;
border-bottom-width: 10px;
`;

const Header = Styled.View`
    height: 50px;
    background-color: yellow;
`;

const Title = Styled.Text`
    font-weight: bold;
    font-size: 30px;
`;

const JoinPage = () => {
    const domain = useContext(DomainContext);
    const { userData, setUserData } = useContext(UserData);
    const { kakaoAuthData } = useContext(KakaoAuthData);

    let [nickName, setNickName] = useState('');
    let [churchName, setChurchName] = useState('');
    let [profilePhoto, setProfilePhoto] = useState('');

    const NickNameTextHandler = (value) => {
        setNickName(value);
    }

    const ChurchNameTextHandler = (value) => {
        setChurchName(value);
    }

    const CheckNickName = () => {

    }

    const JoinUser = () => {
        // console.log(kakaoAuthData);
        let sendCommentUserData = { name: nickName == '' ? kakaoAuthData.nickname : nickName, photo: 'Jesus.png', church: churchName, age: 10, level: 99, role: 0, id_domain: kakaoAuthData.id };
        console.log(sendCommentUserData);
        fetch(domain + '/User/Domain/kakao', {
            method: 'POST',
            body: JSON.stringify(sendCommentUserData),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            console.log("[JOINUSER]");
            console.log(res);
            console.log("[=========]");
            //로그인 
            let userInfo = res[0];
            userInfo.photo = res[0].photo;
            setUserData(userInfo);
        }).catch(e => {console.log("[JOINFAIL]"); console.log(e.json())});
    }

    return (
        <>
        {/* { userData == null && kakaoAuthData != null &&  */}
        <ScrollView style={{width: "95%", backgroundColor: 'skyblue'}}>
            <Text style={Styles.header}>회원가입</Text>

            <Input
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={kakaoAuthData.nickname}
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
            <JoinBtn onPress={() => {
                JoinUser();
            }}>
                <Text>회원가입</Text>
            </JoinBtn>
        </ScrollView>
        {/* } */}
        {/* { userData != null && <Main/> } */}
        </>
        
        
    )
};

//1. 카카오 계정id 보내면 그걸로 만들어진 유정정보 내놓기
//2. 없으면 회원가입 하게 하기
//3. 해 줘

export default JoinPage;