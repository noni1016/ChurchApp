import React, {useState, useEffect, useContext} from 'react';
import { Image, Text } from 'react-native';
import AuthPage from './Screen/01_Auth/Auth'
// import {KakaoAuthData, UserData, UserContextProvider} from '~/Context/User';
import { UserContextProvider} from '~/Context/User';
import {DomainContext, DomainContextProvider} from '~/Context/Domain';

const App = () => {
    return (
      <DomainContextProvider>
        <UserContextProvider>
        {/* <Image source={require(`~/Assets/Images/mainpray.jpg`)} /> */}
          <AuthPage/>
        </UserContextProvider>
     </DomainContextProvider>
  );
};
export default App;
