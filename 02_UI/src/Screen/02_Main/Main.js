import React, { useState, useEffect, useContext } from 'react';
import { Text, Image } from 'react-native';
import AuthPage from '~/Screen/01_Auth/Auth';
import Navigator from '~/Screen/02_Main/Navigator';
import JoinPage from '~/Screen/01_Auth/JoinPage';
import { UserData, UserAuthChecker, UserAuthCheckFlag, UserContextProvider } from '~/Context/User';
import Default from '../99_Etc/Default';

const Main = () => {
    const { authChecker, setAuthChecker } = useContext(UserAuthChecker);
    const { authCheckFlag } = useContext(UserAuthCheckFlag)
    const { currentUserData } = useContext(UserData)

    useEffect(() => {
        //console.log(`Main authChecker : ${authChecker}`);
    })
    return (
        <>
            {authCheckFlag == false && <Image source={require(`~/Assets/Images/mainpray.jpg`)} />}

            {authChecker.checkFlag == false && <AuthPage />}
            {authChecker.checkFlag && currentUserData == null && <JoinPage />}
            {authChecker.checkFlag && currentUserData != null && <Navigator />}
            {/* <Navigator /> */}
        </>

        // <Text>Hello</Text>
    );
};


export default Main;
