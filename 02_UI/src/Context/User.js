import React, {useState, createContext} from 'react';
import { useContext } from 'react/cjs/react.development';

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
