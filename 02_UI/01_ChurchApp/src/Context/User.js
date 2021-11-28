import React, {createContext, useState} from 'react';

const initData = {id: 3, name: '노니', photo: 'Profile/노니.jpg', church: '유목민교회', age: 29, level: 100, role: 'Admin'};

const UserContext = createContext(initData);
const AuthContext = createContext({
    varA: 'SeminHello',
    setVarA: () => {}
});

const UserContextProvider = ({children}) => {
    const [varA, setVarA] = useState('SeminHello');

    return (
        <AuthContext.Provider value={varA, setVarA}>
        <UserContext.Provider value={initData}>

            {children}
        </UserContext.Provider>
        </AuthContext.Provider>
    )

}

export {UserContext, AuthContext, UserContextProvider};