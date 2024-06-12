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
var initSpot = { id: 0, name: `로딩중`, mainImg: `default.jpg`, location: `수원시 영통구 매탄4동 10`, time: "2023-10-26 20:32:00", numMember: 10 };
var initChurch = { id: 0, name: `로딩중`, pastor: `로딩중`, location: `로딩중`, report: 0, mainImg: `default.png`, description: null, numMember: 0};

const UserContextProvider = ({children}) => {
    const [kakaoAuthData, setKakaoAuthData] = useState(null);
    const [tryGetUserData, setTryGetUserDataFlag] = useState(false);
    const [userData, setUserData] = useState(null);
    let domain = useContext(DomainContext);
    const [userClub, setUserClub] = useState([initClub]);
    const [userSpot, setUserSpot] = useState([initSpot]);
    const [userChurch, setUserChurch] = useState([initChurch]);

    useEffect(() => {
        console.log('[[UserData Context]]');
        if (userData) userData.photoUrl = `${domain}/Profile/${userData.photo}` + "?cache="+Math.random();
        console.log(userData);
        if (userData && userData.id) {
            updateUserClub();
            updateUserSpot();
            updateUserChurch();
        }
        console.log(kakaoAuthData);
    }, [userData])

    const updateUserClub = () => {
        console.log('~~~~Update User Data: Club~~~~')
        fetch(`${domain}/User/${userData.id}/Club`).then(res => res.json()).then(res => {setUserClub(res)});
    };

    const updateUserSpot = () => {
        console.log('~~~~Update User Data: Spot~~~~')
        fetch(`${domain}/User/${userData.id}/Spot`).then(res => res.json()).then(res => {setUserSpot(res)});
    };

    const updateUserChurch = () => {
        console.log('~~~~Update User Data: Church~~~~')
        fetch(`${domain}/User/${userData.id}/Church`).then(res => res.json()).then(res => {setUserChurch(res)});
    }

    return (
        <KakaoAuthData.Provider value = {{kakaoAuthData, setKakaoAuthData}}>
        <TryGetUserData.Provider value = {{tryGetUserData, setTryGetUserDataFlag}}>
        <UserData.Provider value = {{userData, setUserData, userClub, updateUserClub, userSpot, updateUserSpot, userChurch, updateUserChurch}}>
            {children}
        </UserData.Provider>
        </TryGetUserData.Provider>
        </KakaoAuthData.Provider>
    )
}

export {UserData, KakaoAuthData, TryGetUserData, UserContextProvider};
