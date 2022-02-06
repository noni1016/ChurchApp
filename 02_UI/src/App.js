import React, {useState, useEffect, useContext} from 'react';
import { Text } from 'react-native';
// import Main from './Screen/02_Main/Main';
import {UserAuthChecker, UserContextProvider} from '~/Context/User';
import {DomainContext, DomainContextProvider} from '~/Context/Domain';
import Churmmunity from './Screen/02_Main/02_Churmmunity/Churmmunity';
import Main from '~/Screen/02_Main/Navigator';

const App = () => {

    return (
      // <DomainContextProvider>
      //   <UserContextProvider>
      //     <Main />
      //   </UserContextProvider>
      // </DomainContextProvider>
      <Main />
        // <Text>Hello</Text>
  );
};
export default App;
