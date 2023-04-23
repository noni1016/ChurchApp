import React, {useState, createContext} from 'react';

const TabNavi = createContext({
    tabNavi : {},
    setTabNavi : () => {}    
})

const NaviContextProvider = ({children}) => {
    const [tabNavi, setTabNavi] = useState(null);
    
    return (
        <TabNavi.Provider value = {{tabNavi, setTabNavi}}>
            {children}
        </TabNavi.Provider>
    )
}

export {TabNavi, NaviContextProvider};
