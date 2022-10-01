import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Dimensions, ScrollView, Image} from 'react-native';
import {DomainContext} from '~/Context/Domain';
import { UserData } from '~/Context/User';
import Styled from 'styled-components/native';
import {launchImageLibrary} from 'react-native-image-picker';

const Container = Styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const GroupNameBox = Styled.View`
    justify-content: center;
    align-items: flex-start;
    background-color: blue;
    width: 90%;
    height: 50px;    
    padding: 0px 0px 0px 10px; //상 우 하 좌
`;

const GroupTitle = Styled.Text`
    color: white;
    font-size: 25px;
    font-family: 'DoHyeon-Regular';
    /* align-items: flex-start; */
    text-align: left;
    /* background-color: #0000FF; */
`;

const PlusBtnBox = Styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 200px;
    margin: 10px 0px 10px 0px; //상 우 하 좌
    background-color: transparent;
`;

const PlusText = Styled.Text`
    color: white;
    background-color: skyblue;
    width: 70px;
    height: 50px;
    font-size: 50px;
    font-family: 'DoHyeon-Regular';
    padding: 5px;
    margin: 10px 0px 10px 0px; //상 우 하 좌
    text-align: center;
    border-radius: 10px;
`;

const FeedTextBox = Styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 90%;
    height: 300px;
    margin: 0px 0px 0px 0px; //상 우 하 좌
    padding: 5px 5px 5px 5px; //상 우 하 좌
    border-radius: 10px;
    border: 1px;
    border-color: blue;
    background-color: transparent;
`;

const ProfileBox = Styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const Input = Styled.TextInput`
    width: 100%;
    background-color: transparent;
    padding: 0px;
    /* margin: 5px 0px 0px 10px; //상 우 하 좌 */
`;

const LocationBox = Styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    height: 50px;
    margin: 10px 0px 0px 0px; //상 우 하 좌
    padding: 5px 5px 5px 5px; //상 우 하 좌
    border-radius: 10px;
    border: 1px;
    border-color: blue;
    background-color: transparent;
`;

const LocationInput = Styled.TextInput`
    width: 50%;
    background-color: transparent;
    padding: 0px;
    /* margin: 5px 0px 0px 10px; //상 우 하 좌 */
    border-bottom-width: 1px;
`;

const SendBtn = Styled.TouchableOpacity`
    width: 90%;
    height: 50px;
    background-color: blue;
    color: white;
    justify-content: center;
    align-items: center;
    margin: 10px 0px 0px 0px; //상 우 하 좌
    border-radius: 10px;
`;


const EditFeed = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    
    const edit = route.params.edit;
    console.log('edit:', edit);
    const club = route.params.club;
    const isNotice = route.params.isNotice ? 1 : 0;
    const {userData} = useContext(UserData);
    const [userProfileImgUrl, SetUserProfileImgUrl] = useState(null);
    const [textInput, setTextInput] = useState('');
    const [location, setLocation] = useState('');
    const [imgSrc, setImgSrc] = useState(undefined);
    const [putImgSuccessFlag, setPutImgSuccess] = useState(false);

    /* react-native-image-picker 라이브러리 사용 옵션 */
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

    /* 최초 마운팅시 Add Mode 이면 공백으로 두고, Edit Mode 이면 내용 채워줌 */
    useEffect(() => {
        if (edit && route.params.feed) 
        {
            setTextInput(route.params.feed.contentText);
            setLocation(route.params.feed.location);
            setImgSrc({uri: domain + route.params.feed.contentImg});
            navigation.setOptions({title: '게시글 수정'});
        }
    }, [])

    /* Feed 올리기. 이미지가 있으면 이미지부터 올리고 텍스트를 업데이트함 */
    const putFeed = () => {
        if (imgSrc != undefined && imgSrc.fileName) updateImg();
        else updateFeed();
    }

    /* Feed 이미지 업데이트 */
    const updateImg = () => {
        let fetchReq = ``;
        let fetchMethod = ``;

        if (edit === false) { // AddMode
            fetchReq = `${domain}/Club/Feed/Img`;
            fetchMethod = `POST`;
        } else { // EditMode
            fetchReq = `${domain}/Club/Feed/Img/${route.params.feed.id}`;
            fetchMethod = `PUT`;
        }

        console.log('fetchReq : ' + fetchReq);

        const imageData = new FormData();
        imageData.append('file', {
            uri: imgSrc.uri,
            type: imgSrc.type,
            name: imgSrc.fileName,
            data: imgSrc.data
        });

        fetch(fetchReq, {
            method: fetchMethod,
            body: imageData,
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'multipart/form-data',
            }
        }).then(res => res.json()).then(res => {
            console.log(res);
            if(res) {
                setPutImgSuccess(true);
            } else {setPutImgSuccess(false)}
        });
    }

    /* 이미지 업데이트 성공하면 텍스트 업데이트 */
    useEffect(() => {        
        if (putImgSuccessFlag == true) {
            updateFeed();
            setPutImgSuccess(false);
        }
    }, [putImgSuccessFlag]);

    /* Feed 텍스트 업데이트 */
    const updateFeed = () => {
        // Feed db 추가   
        let fetchReq = ``;
        let fetchMethod = ``;

        if (edit === false) { // AddMode
            fetchReq = `${domain}/Club/Feed`
            fetchMethod = `POST`;
        } else { // EditMode
            fetchReq = `${domain}/Club/Feed/${route.params.feed.id}`
            fetchMethod = `PUT`;
        }
    
        /* moment 패키지 사용하도록 변경할것 */
        let writeTime = new Date();
        let year = writeTime.getFullYear();
        let month = writeTime.getMonth();
        let date = writeTime.getDate();
        let hours = writeTime.getHours();
        let minutes = writeTime.getMinutes();
        let seconds = writeTime.getSeconds();

        let sendDate = `${year.toString().substr(-2)}.${month + 1 >= 10 ?  month + 1 : '0' + (month + 1)}.${date >= 10 ? date : '0' + date} ${hours}:${minutes}:${seconds}`;

        fetch(fetchReq, {
            method: fetchMethod,
            body : JSON.stringify({clubId: club.id, authorId: userData.id, location: location, time: sendDate, contentText: textInput, notice : isNotice}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json()).then(res => {navigation.goBack();})
        // }).then(res => res.json()).then(res => {navigation.navigate('ClubPage', {tabIdx: 1, edit: true, navigation: navigation});})
    }

    // Camera Roll
    const showCameraRoll = () => {
        launchImageLibrary(options, (response) => {
            if (response.error) {
                console.log('LaunchCamera Error: ', response.error);
            }
            else {
                console.log('ImageSrc: ' + JSON.stringify(response.assets));
                console.log('ImageSrc: ' + response.assets[0].uri);
                setImgSrc(response.assets[0]);
            }
        });
    }


    return (
        <ScrollView>
        <Container>
            {route.params.club && <GroupNameBox><GroupTitle>{route.params.club.name}</GroupTitle></GroupNameBox>}
            {imgSrc == undefined && <PlusBtnBox onPress={() => {showCameraRoll();}}>
                <PlusText>+</PlusText>
                <Text>버튼을 눌러</Text>
                <Text>사진을 추가해보세요</Text>
            </PlusBtnBox>}
            {imgSrc && <PlusBtnBox onPress={() => {showCameraRoll();}}>
                <Image style={{ backgroundColor: 'transparent', width: '100%', height: '100%', resizeMode: 'contain' }} source={{uri : imgSrc.uri}} />
            </PlusBtnBox>}
            <FeedTextBox>
                <ProfileBox>
                    <Image style={{ backgroundColor: 'transparent', width: 50, height: 50, resizeMode: 'contain' }} source={{uri : userData.photo}} />
                    <Text style={{fontWeight: 'bold', fontSize: 18, margin: 10}}>{userData.name}</Text>
                </ProfileBox>
                <Input 
                        multiline
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="내용을 입력해주세요"
                        returnKeyType="done"
                        onChangeText={setTextInput}
                        value={textInput}
                        // onSubmitEditing={({nativeEvent}) => {
                        //     AddInput(nativeEvent.text);
                            
                        // }}
                    />
            </FeedTextBox>
            <LocationBox>
                <Text>지금은 어디에 있나요?: </Text>
                <LocationInput 
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder=""
                        returnKeyType="done"
                        onChangeText={setLocation}
                        value={location}
                    />
            </LocationBox>
            <SendBtn onPress={() => putFeed()}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>게시</Text>
            </SendBtn>
        </Container>
        
        </ScrollView>
    )
}

export default EditFeed;