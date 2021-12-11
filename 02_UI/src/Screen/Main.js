import React, { useState, useEffect, useContext } from 'react';
import { Text, Image } from 'react-native';
import AuthPage from '~/Screen/Auth';
import Navigator from '~/Screen/Navigator';
import { UserAuthChecker, UserAuthCheckFlag, UserContextProvider } from '~/Context/User';
import Default from './Default';

const Main = () => {
    const { authChecker } = useContext(UserAuthChecker);
    const { authCheckFlag } = useContext(UserAuthCheckFlag)

    useEffect(() => {
        //console.log(`Main authChecker : ${authChecker}`);
    })
    return (
        <>
            {authCheckFlag == false && <Image source={require(`~/Assets/Images/mainpray.jpg`)} />}

            {authChecker == false && <AuthPage />}
            {authChecker && <Navigator />}
            {/* <Navigator /> */}
        </>

        // <Text>Hello</Text>
    );
};


export default Main;
