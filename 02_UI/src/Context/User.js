import React, {useState, createContext} from 'react';

const initData = {id: 3, name: '노니', photo: 'Profile/노니.jpg', church: '유목민교회', age: 29, level: 100, role: 'Admin'};

//인증 시도를 했는지 여부
const UserAuthCheckFlag = createContext({
    authCheckFlag : false,
    setAuthCheckFlag: () => {},
});

//인증 성공 여부
const UserAuthChecker = createContext({
    authChecker : false,
    setAuthChecker: () => {},
});
const UserContext = createContext(initData);
const AuthContext = createContext({
    varA: 'SeminHello',
    setVarA: () => {}
});

const UserContextProvider = ({children}) => {
    const [authChecker, setAuthChecker] = useState(false);
    const [authCheckFlag, setAuthCheckFlag] = useState(false);

    return (
        <UserAuthCheckFlag.Provider value = {{authCheckFlag, setAuthCheckFlag}}>
        <UserAuthChecker.Provider value = {{authChecker, setAuthChecker}}>
        <UserContext.Provider value = {initData}>
            {children}
        </UserContext.Provider>
        </UserAuthChecker.Provider>
        </UserAuthCheckFlag.Provider>
    )
}

export {UserContext, UserAuthChecker, UserAuthCheckFlag, UserContextProvider};
