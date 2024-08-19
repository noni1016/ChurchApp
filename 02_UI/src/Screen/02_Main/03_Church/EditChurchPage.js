import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, View, Text, Image, Alert } from 'react-native';
import Styled from 'styled-components/native';
import Styles, { DefaultText } from '~/Style.js';
import { useIsFocused } from '@react-navigation/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Tab from '~/Components/Tab';
import AddBtn from '~/Components/AddBtn';
import DaumMap from '~/Screen/03_Map/DaumMapController';
import RectangleBtn from '~/Components/RectangleBtn';
import GroupMemProfile from '~/Components/GroupMemProfile';
import {launchImageLibrary} from 'react-native-image-picker';
//import SearchLocate from '~/Screen/03_Map/SearchLocate';


const Title = Styled.Text`
    height: 30px;
    color: black;
    font-size: 27px;
    font-family: 'DoHyeon-Regular';
`;

const Side = Styled.View`
    justify-content: flex-end;
    flex-direction: row;
    margin: 0px 5px 0px 0px;
`;

const Input = Styled.TextInput`
background-color: yellow;
`;

const SearchBtn = Styled.TouchableOpacity`
background-color: green;
width: 40%;
border-bottom-width: 3px;
height: 30px;
align-items: center;
`;

const Footer = Styled.View`
    height: 200px;
`;

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

const EditChurchPage = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    const {userData, userChurch} = useContext(UserData);
    const churchData = route.params.churchData;
    const [members, setMembers] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [isLeader, setIsLeader] = useState(false);
    const [originData, setOriginData] = useState(churchData);

    const [imgSrc, setImgSrc] = useState({uri: `${domain}/ChurchMainImg/${churchData.mainImg}`+ "?cache="+Math.random()});
    const [imgUrl, setImgUrl] = useState(`${domain}/ChurchMainImg/${churchData.mainImg}`+ "?cache="+Math.random());

    /* 멤버 정보 불러오기 */
    useEffect(() => {
        fetch(`${domain}/Church/Member/${churchData.id}`).then(res => res.json()).then(res => {setMembers(res)});
        console.log("update member data");
        setImgUrl(`${domain}/ChurchMainImg/${churchData.mainImg}`);
    }, [churchData, userChurch]);

    /* 멤버 정보 불러왓으면 현재 유저가 그룹 멤버인지 확인. 리더 여부도 확인 */
    useEffect(() => {
        setIsMember(false);        
        members.map((member, index) => {
            if (member.id === userData.id) {
                setIsMember(true);
                if (member.role === 1)
                    setIsLeader(true);
            }
        })
        console.log("update is member");
    }, [members])

    useEffect(()=>
    {
        setImgUrl(imgSrc.uri)
    }, [imgSrc])

    const showCameraRoll = () => {
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                alert('사진 변경 취소');
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
            alert('사진 변경 취소');
        });
    }


    return (
        <>
            <ScrollView>
            
            <Input
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={churchData.pastor}
                    returnKeyType="done"
                    onChangeText={(value) => {
                        originData.pastor = value;
                    }}
                    />
                <Image style={{ backgroundColor: 'black', width: '100%', height: 300, resizeMode: 'cover'}} source={{uri: imgUrl}}/>
                <Icon1 name="settings-outline" size={26} color={'black'} onPress={() => 
                    {
                        showCameraRoll();
                    }
                }
                    />
                <ChurchPageHome data={churchData} members={members} isMember={isMember} isLeader={isLeader} navigator={navigation}/>

                <SearchBtn onPress={()=>{alert('취소')}}>
                    <Text>취소</Text>
                </SearchBtn>

<                   SearchBtn onPress={() => {

const fd = new FormData(); //사진도 추가할거임
 fd.append('userId', userData.id);
 fd.append('pastor', churchData.pastor);
 fd.append('location', churchData.location);
 fd.append('description', churchData.description);
 fd.append('location_ll_x', churchData.location_ll.x);
 fd.append('location_ll_y', churchData.location_ll.y);
 fd.append('name', "church!!!");
 if (imgSrc.fileSize)
 {
     fd.append('file', {
        uri: imgSrc.uri,
        type: imgSrc.type,
        name: imgSrc.fileName,
        data: imgSrc.data
    }
    )
 }
console.log("=========");
console.log(imgSrc);
console.log("=========");

                    fetch(`${domain}/Church/${churchData.id}`, {
                         method: `PUT`,
                         body: fd,
                         headers: {
                             Accept: 'application/json', 'Content-Type': 'multipart/form-data',
                         }
                     }).then(res=>res.json()).then(res=>{
                        console.log(res);
                        navigation.replace('ChurchPage', {group: res});
                     });
                    // fetch(`${domain}/Church/${churchData.id}`).then(res=>res.json()).then(res=>console.log(res));
                    //  .then(res => {
                    //     console.log("============");
                    //     // console.log(res);
                    //     // console.log("============");
                    //     // res.json()
                    //     // console.log(res.json());
                    //     //navigation.replace('ChurchPage', {group: res.json()});
                    //  }
                    //  ).then(res => {

                    //     console.log("============");

                    //     console.log("============");
                    //      //navigation.replace('ChurchPage', {group: res});
                    //  })
                }
            }
                    >
                    <Text>적용</Text>
                    </SearchBtn>
                <Footer/>
            </ScrollView>
        </>
    )
}

const Container = Styled.View`
    padding: 10px 10px 0px 10px; //상 우 하 좌
    //background-color: #ff0000;    
`;

const Desc = Styled.Text`
    font-size: 20px;
    color: black;
`;

const NumGroupMemCont = Styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    border-color: #000000;
    border-bottom-width: 1px;    
    border-top-width: 1px;
    padding: 3px 0px 3px 10px;
    //background-color: blue;
`;


const ChurchPageHome = ({data, members, isMember, isLeader, navigator}) => {
    const domain = useContext(DomainContext);    
    const {userData, setUserData, updateUserChurch} = useContext(UserData);
    const isFocused = useIsFocused();
    const [joinText, setJoinText] = useState('활동 교회로 등록');
    const [locate, setLocate] = useState([0,0]);
    const [region, setRegion] = useState('');
    const [originData, setOriginData] = useState(data);
    
    return (
        <Container>
            <Input
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={data.description}
                    returnKeyType="done"
                    onChangeText={(value) => {
                        data.description = value;
                    }}
                    />

            {isFocused && data.location_ll && <DaumMap currentRegion={{
                    latitude: parseFloat(data.location_ll.y),
                    longitude: parseFloat(data.location_ll.x),
                    zoomLevel: 5
                }}
                mapType={"Standard"}
                style={{ width: 400, height: 400, backgroundColor: 'transparent' }}
                markers={[{
                    latitude: parseFloat(data.location_ll.y),
                    longitude: parseFloat(data.location_ll.x),
                    pinColor: "red",
                    pinColorSelect: "yellow",
                    title: "marker test",
                    draggable: false,
                }]}                
                /> 
            }
            <Icon1 name="settings-outline" size={26} color={'black'} onPress={() => {{navigator.navigate('SearchChurchLocate', {data: data, setLocateProcess : setLocate, setRegionProcess : setRegion, navigation: navigator})}}} />
        </Container>
    )
};



export default EditChurchPage;