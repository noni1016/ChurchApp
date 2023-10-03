import React, {useState, useEffect, useContext} from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import {
    createStackNavigator,
} from '@react-navigation/stack';

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

import {launchImageLibrary} from 'react-native-image-picker';
import DaumMap from './../../03_Map/DaumMapController';

const tempUser = {id: 4, name: "짱쎄", photo: 'Profile/짱쎄.jpg', role: 'user'};
const Stack = createStackNavigator();
const options = {
    title: 'Load Photo',
    customButton: [
        { name: 'button_id_1', title: 'CustomButton 1'},
        { name: 'button_id_2', title: 'CustomButton 2'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
}

const HeaderButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    width: 120px;
`;

const HeaderBox = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 100px;
    background-color: transparent;
`;

const HeaderTextArea = styled.View`
    flex-direction: column;
    justify-content: space-between;
`;

const ChangePhoto = styled.TouchableOpacity`
 height: 100%;
 background-color: transparent;
 margin: 0px 10px 0px 0px; //상 우 하 좌
 `;

 const CommonBtn = styled.TouchableOpacity`
background-color: green;
width: 20%;
border-bottom-width: 3px;
`;

const ProfileMain = ({navigation, route}) => {
    const domain = useContext(DomainContext);
    const {userData, setUserData} = useContext(UserData);
    const [member, setMember] = useState(route ? route.params.member : userData);
    const [imgSrc, setImgSrc] = useState('');
    const [locate, setLocate] = useState([0,0]);
    const [region, setRegion] = useState('');
    const [userImgUrl, setUserImgUrl] = useState(`${domain}/Profile/Jesus.png`);
    
    useEffect(() => {
        setMember(route != undefined ? route.params.member : userData);
    }, [])

    useEffect(() => {
        console.log('[useEffect: userData]')
        console.log(userData);
        setUserImgUrl(`${domain}/Profile/${userData.photo}` + "?cache="+Math.random());
    }, [userData])

    // useEffect(() => {
    //     console.log(userImgUrl);
    // }, [userImgUrl])

    useEffect(() => {
        if (member)
        {
            navigation.setOptions({
                title: member.name,
                headerShown: true,
                headerRight: () => (
                    <HeaderButtonsContainer>
                        {userData.id != member.id && <Icon2 name="notification" size={26} onPress={() => alert('신고하기')} />}
                        <Icon2 name="message1" size={26} onPress={() => alert('채팅')} />
                        {userData.id == member.id && <Icon1 name="settings-outline" size={26} onPress={() => alert('프로필 수정')} />}
                    </HeaderButtonsContainer>
                )
            });
        }


    }, [member])

    useEffect(() => {
        console.log(imgSrc)
        if (imgSrc)
        {
            console.log("=====photo change=====");
            console.log(imgSrc.uri);
            const imageData = new FormData();
            imageData.append('file', {
              uri: imgSrc.uri,
              type: imgSrc.type,
              name: imgSrc.fileName,
              data: imgSrc.data
            });
      
            let fetchHeader = {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            }
            reqChangeUserInfo(fetchHeader, "photo", imageData)
          }
    }, [imgSrc])


    // Camera Roll
 const showCameraRoll = () => {
    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            alert('프사변경취소');
            return;
        }
        if (response.error) {
            console.log('LaunchCamera Error: ', response.error);
            return;
        }
        if (response.assets.length > 0) {
            setImgSrc(response.assets[0]);
            return;
        }
        alert('프사변경취소');
    });
}

const reqChangeUserInfo = (fetchHeader, changeType, changeValue) => {
    console.log(changeType, changeValue);
    console.log(userData);
    let fetchUrl = `${domain}/User/${userData.id}/${changeType}`;
    console.log(fetchUrl);
    
    fetch(fetchUrl, {
      method: 'PUT',
      body: changeValue,
      headers: fetchHeader
    }).then(res => res.json()).then(res => {
        console.log('[query result]');
        console.log(res);
        if (res.id) {
            setUserData(res);
        }
    }).catch(e => {
      alert('프로필 사진 변경에 실패하였습니다.');
      console.log("[ChangeFail]");
      console.log(e);
    });
  };

    return (
        <ScrollView style={{padding: 10}}>
            <HeaderBox>
            <ChangePhoto onPress={() => {showCameraRoll();}}>
                <Image style={{ width: 70, height: 70, flex: 1, resizeMode: 'contain' }} source={{ uri: userImgUrl }}/>
            </ChangePhoto>

            <HeaderTextArea style={{ flex: 3 }}>
                    <Text style={{ fontWeight: 'bold'}}>{member.name}</Text>
                    {member.description ? <Text>{member.description}</Text> : <Text>자기소개 없음</Text>}
                    <Text>{member.church}</Text>
                </HeaderTextArea>
            </HeaderBox>
            
            {/* <CommonBtn onPress={() => {{navigation.navigate('SearchLocate', {setLocateProcess : setLocate, setRegionProcess : setRegion, navigation: route})}}}>
                    {/* <PlusText>+</PlusText> }
                    <Text>지역 수정</Text>
                    </CommonBtn> */}
            <DaumMap currentRegion={{
                latitude: parseFloat(100),
                longitude: parseFloat(100),
                zoomLevel: 5,
               }}
                mapType={"Standard"}
                style={{ width: 400, height: 400, backgroundColor: 'transparent' }}/>

        </ScrollView>
    )
}



const ProfileStackNavi = ({tabNavi}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name={'ProfileMain'}
            children={({navigation}) => <ProfileMain navigation={navigation} tabNavi={tabNavi} />}        
        />

      </Stack.Navigator>  
    );
}

const Profile = ({navigation}) => {
    return (
        <ProfileStackNavi tabNavi={navigation}/>
    )
};



export {Profile as default, ProfileMain} ;