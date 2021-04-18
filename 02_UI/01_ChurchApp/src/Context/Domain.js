import React, {createContext} from 'react';

const DomainContext = createContext('http://175.212.209.93:7009');

const DomainContextProvider = ({children}) => {

    return (
        <DomainContext.Provider value={'http://175.212.209.93:7009'}>
            {children}
        </DomainContext.Provider>
    )

}

export {DomainContext, DomainContextProvider};