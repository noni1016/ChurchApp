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

var initClub = { id: 0, name: `로딩중`, mainImg: `default.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 };

const UserContextProvider = ({children}) => {
    const [kakaoAuthData, setKakaoAuthData] = useState(null);
    const [tryGetUserData, setTryGetUserDataFlag] = useState(false);
    const [userData, setUserData] = useState(null);
    let domain = useContext(DomainContext);
    const [userClub, setUserClub] = useState([initClub]);

    useEffect(() => {
        console.log('[[UserData Context]]');
        if (userData) userData.photoUrl = `${domain}/Profile/${userData.photo}` + "?cache="+Math.random();
        console.log(userData);
        if (userData && userData.id) {
            updateUserClub();
        }
    }, [userData])

    const updateUserClub = () => {
        console.log('~~~~Update User Data~~~~')
        fetch(`${domain}/User/${userData.id}/Club`).then(res => res.json()).then(res => {setUserClub(res)});
    };

    return (
        <KakaoAuthData.Provider value = {{kakaoAuthData, setKakaoAuthData}}>
        <TryGetUserData.Provider value = {{tryGetUserData, setTryGetUserDataFlag}}>
        <UserData.Provider value = {{userData, setUserData, userClub, updateUserClub}}>
            {children}
        </UserData.Provider>
        </TryGetUserData.Provider>
        </KakaoAuthData.Provider>
    )
}

export {UserData, KakaoAuthData, TryGetUserData, UserContextProvider};
