import React, {useState, useEffect, useContext} from 'react';
import { Text } from 'react-native';
import Main from './Screen/02_Main/Main';
import {UserAuthChecker, UserContextProvider} from '~/Context/User';
import {DomainContext, DomainContextProvider} from '~/Context/Domain';

const App = () => {

    return (
      <DomainContextProvider>
        <UserContextProvider>
          <Main />
        </UserContextProvider>
      </DomainContextProvider>

        // <Text>Hello</Text>
  );
};
export default App;
