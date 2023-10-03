import React, {useState, createContext, useEffect, useContext} from 'react';
import { DomainContext } from './Domain';

//카카오계정 정보
const KakaoAuthData = createContext({
    kakaoAuthData : {},
    setKakaoAuthData: () => {},
});

const TryGetUserData = createContext({
        tryGetUserData : false,
        setTryGetUserDataFlag: () => {},
    });

//회원 정보
const UserData =  createContext({
    userData : {},
    setUserData: ()=>{},
});

const UserContextProvider = ({children}) => {
    const [kakaoAuthData, setKakaoAuthData] = useState(null);
    const [tryGetUserData, setTryGetUserDataFlag] = useState(false);
    const [userData, setUserData] = useState(null);
    let domain = useContext(DomainContext);

    useEffect(() => {
        console.log('[[UserData Context]]');
        if (userData) userData.photoUrl = `${domain}/Profile/${userData.photo}` + "?cache="+Math.random();
        console.log(userData);
    }, [userData])

    return (
        <KakaoAuthData.Provider value = {{kakaoAuthData, setKakaoAuthData}}>
        <TryGetUserData.Provider value = {{tryGetUserData, setTryGetUserDataFlag}}>
        <UserData.Provider value = {{userData, setUserData}}>
            {children}
        </UserData.Provider>
        </TryGetUserData.Provider>
        </KakaoAuthData.Provider>
    )
}

export {UserData, KakaoAuthData, TryGetUserData, UserContextProvider};
