import React, {useState, createContext} from 'react';

const initData = {id: 3, name: '노니', photo: 'Profile/노니.jpg', church: '유목민교회', age: 29, level: 100, role: 'Admin'};

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

    return (
        <UserAuthChecker.Provider value = {{authChecker, setAuthChecker}}>
        <UserContext.Provider value = {initData}>
            {children}
        </UserContext.Provider>
        </UserAuthChecker.Provider>
    )
}

export {UserContext, UserAuthChecker, UserContextProvider};
