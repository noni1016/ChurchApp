import React, {useState, useEffect, useContext} from 'react';
import { Text } from 'react-native';
import Main from './Screen/Main';
import {UserAuthChecker, UserContextProvider} from '~/Context/User';

const App = () => {

    return (
        <UserContextProvider>
                <Main />
        </UserContextProvider>

        // <Text>Hello</Text>
  );
};
export default App;
