import React, {createContext} from 'react';

const initData = {id: 3, name: '노니', photo: 'Profile/노니.jpg', church: '유목민교회', age: 29, level: 100, role: 'Admin'};

const UserContext = createContext(initData);

const UserContextProvider = ({children}) => {

    return (
        <UserContext.Provider value={initData}>
            {children}
        </UserContext.Provider>
    )

}

export {UserContext, UserContextProvider};