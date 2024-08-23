import React, {useState, useEffect, useContext} from 'react';
import { Image, Text, LogBox } from 'react-native';
import AuthPage from './Screen/01_Auth/Auth'
import { UserContextProvider} from '~/Context/User';
import {DomainContextProvider} from '~/Context/Domain';
// import Main from '~/Screen/02_Main/Main';

const App = () => {

  useEffect(() => {
    LogBox.ignoreAllLogs();
  })

    return (
      <DomainContextProvider>
      <UserContextProvider>
        <AuthPage/>
      </UserContextProvider>
   </DomainContextProvider>
            
  );
};
export default App;
console.disableYellowBox = true;
