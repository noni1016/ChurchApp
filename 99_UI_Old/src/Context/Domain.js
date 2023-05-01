import React, {createContext} from 'react';

const DomainContext = createContext('http://121.139.124.10:7009');

const DomainContextProvider = ({children}) => {

    return (
        <DomainContext.Provider value={'http://121.139.124.10:7009'}>
            {children}
        </DomainContext.Provider>
    )

}

export {DomainContext, DomainContextProvider};