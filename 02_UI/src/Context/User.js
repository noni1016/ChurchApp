import React, {useState, createContext} from 'react';
import { useContext } from 'react/cjs/react.development';

const initData = {id: 3, name: '노니', photo: 'Profile/노니.jpg', church: '유목민교회', age: 29, level: 100, role: 'Admin'};

//카카오계정 정보
const KakaoAuthData = createContext({
    kakaoAuthData : {},
    setKakaoAuthData: () => {},
});

//회원 정보
const UserData =  createContext({
    userData : {},
    setUserData: ()=>{},
});

const UserContext = createContext(initData);

const UserContextProvider = ({children}) => {
    const [kakaoAuthData, setKakaoAuthData] = useState(null);
    const [userData, setUserData] = useState(null);

    return (
        <KakaoAuthData.Provider value = {{kakaoAuthData, setKakaoAuthData}}>
        <UserData.Provider value = {{userData, setUserData}}>
        <UserContext.Provider value = {initData}>
            {children}
        </UserContext.Provider>
        </UserData.Provider>
        </KakaoAuthData.Provider>
    )
}

export {UserData, UserContext, KakaoAuthData, UserContextProvider};
