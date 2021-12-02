import React, {useState, useEffect, useContext} from 'react';
import { Text } from 'react-native';
import AuthPage from '~/Screen/Auth';
import Navigator from '~/Screen/Navigator';
import {UserAuthChecker, UserContextProvider} from '~/Context/User';

const Main = () => {
    const {authChecker} = useContext(UserAuthChecker);

    useEffect(()=>
    {
        console.log(`Main authChecker : ${authChecker}`);
    })
    return (
    <>
        {authChecker == false && <AuthPage />}
        {authChecker && <Navigator />}
</>

        // <Text>Hello</Text>
  );
};


export default Main;
