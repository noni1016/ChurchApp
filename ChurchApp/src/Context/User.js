import React, {useState, createContext} from 'react';
import { useContext } from 'react/cjs/react.development';

//카카오계정 정보
const KakaoAuthData = createContext({
    kakaoAuthData : {},
    setKakaoAuthData: () => {},
});

const TryGetKakao = createContext({
        tryGetKakao : false,
        setTryGetKakaoFlag: () => {},
    });

//회원 정보
const UserData =  createContext({
    userData : {},
    setUserData: ()=>{},
});

const UserContextProvider = ({children}) => {
    const [kakaoAuthData, setKakaoAuthData] = useState(null);
    const [tryGetKakao, setTryGetKakaoFlag] = useState(false);
    const [userData, setUserData] = useState(null);

    return (
        <KakaoAuthData.Provider value = {{kakaoAuthData, setKakaoAuthData}}>
        <TryGetKakao.Provider value = {{tryGetKakao, setTryGetKakaoFlag}}>
        <UserData.Provider value = {{userData, setUserData}}>
            {children}
        </UserData.Provider>
        </TryGetKakao.Provider>
        </KakaoAuthData.Provider>
    )
}

export {UserData, KakaoAuthData, TryGetKakao, UserContextProvider};
