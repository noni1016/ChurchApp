import React, { useState, useEffect, useContext } from 'react';
import { Text, Image } from 'react-native';
import Navigator from '~/Screen/02_Main/Navigator';
import { UserData, KakaoAuthData, UserContextProvider } from '~/Context/User';
import Default from '../99_Etc/Default';

const Main = () => {
    const { kakaoAuthData } = useContext(KakaoAuthData)
    const { userData } = useContext(UserData)

    useEffect(() => {
        //console.log(`Main authChecker : ${authChecker}`);
    })
    return (
        <>
        {kakaoAuthData != null && userData != null && <Navigator />}
            {/* {authCheckFlag == false && <Image source={require(`~/Assets/Images/mainpray.jpg`)} />}

            {authChecker.checkFlag == false && <AuthPage />}
            {authChecker.checkFlag && currentUserData == null && <JoinPage />}
            {authChecker.checkFlag && currentUserData != null && <Navigator />} */}
            {/* <Navigator /> */}
        </>

        // <Text>Hello</Text>
    );
};


export default Main;
