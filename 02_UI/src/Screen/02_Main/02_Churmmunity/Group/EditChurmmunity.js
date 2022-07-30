import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Touchable } from 'react-native';
import Styled from 'styled-components/native';
import { DomainContext } from '~/Context/Domain';
import { UserData } from '~/Context/User';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageSize from 'react-native-image-size';
import CharacterCountLimit from '~/Components/CharacterCountLimit';
import Icon from 'react-native-vector-icons/AntDesign';
import TagBox from '~/Components/TagBox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { create } from 'react-test-renderer';


const OptionName = Styled.Text`
    margin: 20px 10px 10px 5px;
    height: 30px;
    color: black;
    font-size: 27px;
    font-family: 'DoHyeon-Regular';
`;

const TypeSelectBtnsBox = Styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

const TypeSelectBtn = Styled.Text`
    text-align: center;
    text-align-vertical: center;
    width: 70px;
    height: 40px;
    background-color: ${props => props.isSelected ? 'blue' : 'transparent'};
    color: ${props => props.isSelected ? 'white' : 'blue'};
    border: 1px;
    border-radius: 10px;
    border-color: blue;
    font-size: 18px;
    font-family: 'DoHyeon-Regular';
`;

const TitleInput = Styled.TextInput`
    width: 90%;
    background-color: transparent;
    padding: 0px;
    margin: 10px 10px 10px 20px; //상 우 하 좌
    border-bottom-width: 1px;
    font-size: 18px;
`;

const KeywordInput = Styled.TextInput`
    width: 80%;
    background-color: transparent;
    padding: 0px;
    margin: 10px 10px 10px 20px; //상 우 하 좌
    border-bottom-width: 1px;
    font-size: 18px;
`;

const PlusBtnBox = Styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 100%;
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

const DescInputBox = Styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;    
    padding: 5px 5px 5px 5px; //상 우 하 좌

`;

const DescInput = Styled.TextInput`
    width: 90%;
    height: 200px;
    border-radius: 10px;
    border: 1px;
    border-color: blue;
    background-color: transparent;
    text-align-vertical: top;
`;

const KeywordView = Styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    background-color : transparent;
    margin: 0px 10px 20px 10px; //상 우 하 좌
`;

const SendBtnBox = Styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const SendBtn = Styled.TouchableOpacity`
    width: 90%;
    height: 50px;
    color: white;
    justify-content: center;
    align-items: center;
    margin: 10px 0px 0px 0px; //상 우 하 좌
    border-radius: 10px;
`;


const EditChurmmunity = ({route, navigation}) => {
    const domain = useContext(DomainContext);
    const edit = route.params.edit ? route.params.edit : 0;
    const editData = route.params.editData;
    const [createType, setCreateType] = useState(1);
    const [imgSrc, setImgSrc] = useState(undefined);
    const [textInput, setTextInput] = useState('');
    const [content, setContent] = useState({name: '', mainImg: '', location: '', location_ll: {x: 0, y: 0}, description: '', keyword: [], dateTime: ''});
    const [keyword, setKeyword] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    /* react-native-image-picker 라이브러리 사용 옵션 */
    const options = {
        title: 'Load Photo',
        customButton: [
            { name: 'button_id_1', title: 'CustomButton 1' },
            { name: 'button_id_2', title: 'CustomButton 2' },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
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

    const putChurmmunity = () => {
        if (edit === 0)
        {
            // 유효성 검사
            if (content.name == '') {
                alert('모임 이름을 입력해주세요'); 
                return;
            } else if (imgSrc == null) {
                alert('모임 대표 이미지를 추가해주세요');
                return;
            } else if (content.description == '') {
                alert('모임 설명을 입력해주세요');
                return;
            } else if (createType == 2 && content.dateTime == '') {
                alert('모임 시간을 입력해주세요');
                return;
            } // 모임 지역 입력 추가

            // 대표 이미지 먼저 업로드
            let res = updateImg();
            
            // if (res) updateGroupInfo(res);
        }
        // alert('Submit Button Pressed!');
    }    
    const delChurmmunity = () => {
        alert('Delete Button Pressed!');
    }

    const updateImg = () => {
        let Res = undefined;
        let fetchReq = ``;
        let fetchMethod = ``;
        let keywordString = ``;
        // 키워드를 하나의 string 으로 만들기
        content.keyword.map((v, i) => {
            keywordString += (v + ',')
        })

        console.log(keywordString);

        if (edit == false) { // AddMode
            fetchReq = `${domain}/Group/${createType}`;
            fetchMethod = `POST`;
        }

        console.log('fetchReq : ' + fetchReq);

        const fd = new FormData();
        fd.append('name', content.name);
        fd.append('location', content.location);
        fd.append('location_ll_x', content.location_ll.x);
        fd.append('location_ll_y', content.location_ll.y);
        fd.append('dateTime', content.dateTime);
        fd.append('description', content.description);
        fd.append('keyword', keywordString);
        fd.append('file', {
            uri: imgSrc.uri,
            type: imgSrc.type,
            name: imgSrc.fileName,
            data: imgSrc.data
        });

        console.log(fd);

        fetch(fetchReq, {
            method: fetchMethod,
            body: fd,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => res.json()).then(res => {
            console.log(res);
            if (res.fileName) {
                console.log(res.fileName);
                Res = res.fileName;
            } else {
                Res = undefined;
            }
        })

        return Res;
    }


    useEffect(() => {
        if (edit === 1 && route.params.editData) /* 클럽 모임 수정 모드 */
        {
            navigation.setOptions({title: '모임 정보 수정'});
            setImgSrc({uri: domain + '/' + route.params.editData.mainImg});
            setTextInput(route.params.editData.description);
            setContent(route.params.editData);
        }
        else if (edit === 2 && route.params.editData) /* 번개 모임 수정 모드 */
        {
            navigation.setOptions({title: '번개 모임 수정'});
        }
    }, [edit, route.params.editData])

    const addKeyword = () => {
        setContent((current) => {let newContent = {...current}; newContent.keyword.push(keyword.replace(/(\s*)/g, "")); return newContent});
        setKeyword('');
    };

    // Debugging 용 useEffect
    useEffect(() => {
        if (content.dateTime)
        {
            console.log(moment(content.dateTime).format('YYYY.MM.DD HH:mm:ss'))
        }
            // console.log(content.dateTime);
    }, [content.dateTime]);

    return (        
        <ScrollView>
            {!edit && <OptionName>모임 유형</OptionName>}
            {!edit && (<TypeSelectBtnsBox>
                <TouchableOpacity onPress={() => setCreateType(1)}><TypeSelectBtn isSelected={createType == 1}>공동체</TypeSelectBtn></TouchableOpacity>
                <TouchableOpacity onPress={() => setCreateType(2)}><TypeSelectBtn isSelected={createType == 2}>번개</TypeSelectBtn></TouchableOpacity>
            </TypeSelectBtnsBox>)}
            <OptionName>모임 이름</OptionName>
            <TitleInput color="black" placeholderTextColor="gray" maxLength={20} value={content.name} placeholder={'최대 20자'} onChangeText={(v)=>{setContent((current) => {let newContent = {...current}; newContent.name = v; return newContent})}} />
            <CharacterCountLimit curLength={content.name ? content.name.length : 0} maxLength={20} />
            <OptionName>모임 대표 이미지</OptionName>
            {imgSrc == undefined && <PlusBtnBox onPress={() => { showCameraRoll(); }}>
                <PlusText>+</PlusText>
                <Text>버튼을 눌러</Text>
                <Text>사진을 추가해보세요</Text>
            </PlusBtnBox>}
            {imgSrc && <PlusBtnBox onPress={() => { showCameraRoll(); }}>
                <Image style={{ backgroundColor: 'transparent', width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: imgSrc.uri }} />
            </PlusBtnBox>}
            <OptionName>모임 설명</OptionName>
            <DescInputBox>
                <DescInput
                    multiline
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="모임 설명은 모임 메인 페이지에 표시됩니다."
                    returnKeyType="done"
                    maxLength={200}
                    onChangeText={(v) => {setContent((current) => {let newContent = {...current}; newContent.description = v; return newContent})}}
                    value={content.description}
                    color="black" placeholderTextColor="gray"
                />
            </DescInputBox>
            <CharacterCountLimit curLength={content.description ? content.description.length : 0} maxLength={200} />


            <OptionName>검색 키워드</OptionName>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <KeywordInput color="black" placeholderTextColor="gray" multiline={false} maxLength={10} value={keyword} placeholder={'최대 10자'} onChangeText={(v)=>{setKeyword(v)}} onSubmitEditing={() => addKeyword()}/>
                <Icon name="pluscircle" size={26} onPress={() => addKeyword()} />
            </View>
            <KeywordView>
                {content.keyword ? content.keyword.map((v, i) => <TagBox text={v} color="blue" onPressDelBtn={() => setContent((current) => {let newContent = {...current}; newContent.keyword.splice(i, 1); return newContent})}/>) : null}
            </KeywordView>

            {createType == 2 ? 
            (<>
                <OptionName>모임 시간</OptionName>
                <TouchableOpacity style={{marginLeft: 10, marginBottom: 10}} onPress={() => setDatePickerVisibility(true)}>
                    <Text>{content.dateTime ? content.dateTime : '여기를 눌러 시간을 설정하세요'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={(date) => {setContent((current) => {let newContent = {...current}; newContent.dateTime=moment(date.toUTCString()).format('YYYY.MM.DD HH:mm'); return newContent;}); setDatePickerVisibility(false);}}
                    onCancel={() => setDatePickerVisibility(false)}
                />
            </>)
            : null}


            <OptionName>모임 지역</OptionName>
            <PlusBtnBox onPress={() => {{navigation.navigate('SearchLocate', {navigation: navigation})}}}>
                <PlusText>+</PlusText>
                <Text>네이버 지도</Text>
            </PlusBtnBox>

            <SendBtnBox>
                <SendBtn style={{backgroundColor: 'blue'}} onPress={() => putChurmmunity()}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>게시</Text>
                </SendBtn>
            </SendBtnBox>
            <SendBtnBox>
                <SendBtn style={{backgroundColor: 'red'}} onPress={() => delChurmmunity()}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>모임 해산</Text>
                </SendBtn>
            </SendBtnBox>
        </ScrollView>);

};

export default EditChurmmunity;