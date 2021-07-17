import React, {createContext, useState, useContext, useEffect} from 'react';
import {DomainContext} from '~/Context/Domain';

var initGroupData = { id: 0, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 };
var initLightData = [{ id: 0, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `로딩중`, time: "0000-00-00 00:00:00", numMember: 0 },
{ id: 1, name: `로딩중`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `로딩중`, time: "0000-00-00 00:00:00", numMember: 0 }
];

const DataContext = createContext({
    group: initGroupData,
    light: initLightData,
});

const DataContextProvider = ({children}) => {

    const domain = useContext(DomainContext);

    var [myGroupDatas, setMyGroupDatas] = useState([initGroupData]);
    var [myLightDatas, setMyLightDatas] = useState([initLightData]);
    var [recGroups, setRecGroups] = useState([initGroupData]);
    var [recLights, setRecLights] = useState([initLightData]);

    useEffect(() => {
        fetch(domain + '/churmmunity/getMyGroupDatas').then(res => res.json()).then(res => {setMyGroupDatas(res)});
        fetch(domain + '/churmmunity/getMyLightDatas').then(res => res.json()).then(res => {setMyLightDatas(res)});
        fetch(domain + '/churmmunity/getRecGroupsOrderRand').then(res => res.json()).then(res => {setRecGroups(res)});
        fetch(domain + '/churmmunity/getRecLightsOrderTime').then(res => res.json()).then(res => {setRecLights(res)});
    }, []);

    return (
        <DataContext.Provider value={{myGroupDatas, myLightDatas, recGroups, recLights}}>
            {children}
        </DataContext.Provider>
    )

}

export {DataContext, DataContextProvider};