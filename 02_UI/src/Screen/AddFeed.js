import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Dimensions, ScrollView, Image} from 'react-native';
import {DomainContext} from '~/Context/Domain';
import { UserContext } from '~/Context/User';
import Styled from 'styled-components/native';
import {launchImageLibrary} from 'react-native-image-picker';
import { TextInput } from 'react-native-gesture-handler';

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
    const data = route.params.groupData;    
    const user = useContext(UserContext);
    const [userProfileImgUrl, SetUserProfileImgUrl] = useState(null);
    const [textInput, SetTextInput] = useState('');
    const [location, SetLocation] = useState('');
    const [imageSource, SetImageSource] = useState(undefined);
    const [imageWidth, SetImageWidth] = useState();
    const [imageHeight, SetImageHeight] = useState();
    const [putImgSuccessFlag, SetPutImgSuccess] = useState(false);

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

    // Get User Image
    useEffect(() => {
        SetUserProfileImgUrl(`${domain}/${user.photo}`);
    }, [user]);


    const PutFeed = () => {
        // console.log(value);
        alert(textInput);
        alert(location);

        if (imageSource) UpdateImg();
        else UpdateFeed();
    }

    const UpdateImg = () => {
        let fetchReq = ``;
        let fetchMethod = ``;

        fetchReq = `${domain}/Churmmunity/Feed/Img`;
        fetchMethod = `POST`;

        const imageData = new FormData();
        imageData.append('file', {
            uri: imageSource.uri,
            type: imageSource.type,
            name: imageSource.fileName,
            data: imageSource.data
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
                SetPutImgSuccess(true);
            } else {StPutImgSuccess(false)}
        });
    }

    useEffect(() => {        
        if (putImgSuccessFlag == true) {
            UpdateFeed();
            SetPutImgSuccess(false);
        }
    }, [putImgSuccessFlag]);

    const UpdateFeed = () => {
        // Feed db 추가   
        let fetchReq = ``;
        let fetchMethod = ``;

        fetchReq = `${domain}/Churmmunity/Feed`
        fetchMethod = `POST`;
        // sql = `INSERT INTO Feed (groupId, authorId, location, time, contentImg, contentText) 
        //VALUES (${req.body.groupId}, ${req.body.authorId}, ${req.body.location}, '${req.body.time}', '${req.body.contentImg}', '${req.body.contentText}')`;
    
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
            body : JSON.stringify({groupId: data.id, authorId: user.id, location: location, time: sendDate, contentText: textInput}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json()).then(res => {console.log('SUCCESS: ', JSON.stringify(res)); navigation.navigate('GroupPage', {tabIdx: 1, navigation: navigation});})
    }

    // Camera Roll
    const ShowCameraRoll = () => {
        launchImageLibrary(options, (response) => {
            if (response.error) {
                console.log('LaunchCamera Error: ', response.error);
            }
            else {
                console.log('ImageSrc: ' + JSON.stringify(response.assets));
                console.log('ImageSrc: ' + response.assets[0].uri);
                // SetImageSource("file:///data/user/0/com.churchapp/cache/rn_image_picker_lib_temp_4af794bf-b436-4f03-abfe-6b53e73e9f21.jpg");
                SetImageSource(response.assets[0]);
            }
        });
    }


    return (
        <ScrollView>
        <Container>
            <GroupNameBox><GroupTitle>{data.name}</GroupTitle></GroupNameBox>
            {imageSource == undefined && <PlusBtnBox onPress={() => {ShowCameraRoll();}}>
                <PlusText>+</PlusText>
                <Text>버튼을 눌러</Text>
                <Text>사진을 추가해보세요</Text>
            </PlusBtnBox>}
            {imageSource && <PlusBtnBox onPress={() => {ShowCameraRoll();}}>
                <Image style={{ backgroundColor: 'transparent', width: '100%', height: '100%', resizeMode: 'contain' }} source={{uri : imageSource.uri}} />
            </PlusBtnBox>}
            <FeedTextBox>
                <ProfileBox>
                    <Image style={{ backgroundColor: 'transparent', width: 50, height: 50, resizeMode: 'contain' }} source={{uri : userProfileImgUrl}} />
                    <Text style={{fontWeight: 'bold', fontSize: 18, margin: 10}}>{user.name}</Text>
                </ProfileBox>
                <Input 
                        multiline
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="내용을 입력해주세요"
                        returnKeyType="done"
                        onChangeText={SetTextInput}
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
                        onChangeText={SetLocation}
                        value={location}
                    />
            </LocationBox>
            <SendBtn onPress={() => PutFeed()}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>게시</Text>
            </SendBtn>
        </Container>
        
        </ScrollView>
    )
}

export default EditFeed;