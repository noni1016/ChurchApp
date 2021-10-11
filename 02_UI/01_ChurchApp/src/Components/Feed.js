import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import Icon from 'react-native-vector-icons/Entypo';

const FeedContainer = Styled.View`
    flex-direction: column;
    background-color: transparent;
    margin: 10px 5px 5px 5px; //상 우 하 좌
`;

const FeedHeader = Styled.View`
    flex-direction: row;
    position: relative;
    align-items: center;
    margin: 0px 0px 5px 0px; //상 우 하 좌
`;

const HeaderInfo = Styled.View`
    flex-direction: column;
    justify-content: space-evenly;
    background-color: transparent;
    margin: 0px 0px 0px 5px; //상 우 하 좌
`;

const HeaderOptionBtnContainer = Styled.View`
    position: absolute;
    right: 0px;
    background-color: transparent;
`;

const FeedBody = Styled.View`
    flex-direction: column;
    margin: 0px 10px 0px 3px; //상 우 하 좌
`;

const FeedImgContainer = Styled.View`
    width: ${Dimensions.get('window').width * 0.98}px;
`;

const FeedFooter = Styled.View`
    flex-direction: column;
    margin: 5px 0px 0px 0px; //상 우 하 좌
    background-color: yellow;
`;

const FeedCommentContainer = Styled.View`
    flex-direction: row;
`;

const tempFeedContent = {
    authorId: 3,
    location: '제주 말머리운하 근처',
    time: '5분 전',
    contentImg: require(`~/Assets/Images/WinLockImages/0b8a46c6f6829edc4d7c56905d0fe76c3139cc2fc7d31a7f3aafefabb2af083a.jpg`),
    contentText: '날씨 좋다... \n그냥 좋다...',
    comments: [
        {authorId: 5, time: '1분 전', text: '감성이 ㄷㄷㄷ'},
        {authorId: 6, time: '2분 전', text: '나도 나가야겠다'},
    ]
}


const Feed = () => {

    const domain = useContext(DomainContext);
    let [feedAuthorData, setFeedAuthorData] = useState();
    let [feedAuthorImgUrl, setFeedAuthorImgUrl] = useState('');
    let [resizedWidth, setResizedWidth] = useState();
    let [resizedHeight, setResizedHeight] = useState();

    useEffect(() => {
        let sendUserData = {userId: tempFeedContent.authorId};
        fetch(domain + '/Churmmunity/GetUserData', {
            method: 'POST',
            body: JSON.stringify(sendUserData),
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => setFeedAuthorData(res[0]));
    }, [])
    
    useEffect(() => {
        if (feedAuthorData)
        {
            setFeedAuthorImgUrl(`${domain}/${feedAuthorData.photo}`);
        }
    }, [feedAuthorData]);
    
    useEffect(() => {
        if (domain && feedAuthorImgUrl != '')
        {
            Image.getSize(feedAuthorImgUrl, (width, height) => {
                // console.log(width + ' - ' + height);
                // setImgWidth(width);
                // setImgHeight(height);
                    setResizedWidth(Dimensions.get('window').width * 0.95);
                    setResizedHeight((Dimensions.get('window').width * 0.95) / width * height);
    
                // console.log(resizedWidth + ' - ' + resizedHeight);
    
            })
        }
    })

    return (
        <FeedContainer>
            <FeedHeader>
                <Image style={{ backgroundColor: 'transparent', width: 50, height: 50, resizeMode: 'contain' }} source={feedAuthorImgUrl ? {uri: feedAuthorImgUrl } : null} />
                <HeaderInfo>
                    {feedAuthorData && 
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            {feedAuthorData.name}
                        </Text>}
                    <Text>
                    {tempFeedContent.location} - {tempFeedContent.time}
                    </Text>
                </HeaderInfo>
                <HeaderOptionBtnContainer>
                    <Icon name="dots-three-vertical" size={30} onPress={() => alert('This is a dots-three-vertical button!')} />
                </HeaderOptionBtnContainer>
            </FeedHeader>
            <FeedBody>
                <FeedImgContainer>
                    <Image style={{ backgroundColor: 'transparent', width: resizedWidth, height: resizedHeight, resizeMode: 'contain' }} source={feedAuthorImgUrl ? {uri: feedAuthorImgUrl } : null} />
                </FeedImgContainer>
                <Text>{tempFeedContent.contentText}</Text>
            </FeedBody>

            <FeedFooter>
                <FeedCommentContainer>
                    <Image style={{ backgroundColor: 'transparent', width: 25, height: 25, resizeMode: 'contain' }} source={feedAuthorImgUrl ? {uri: feedAuthorImgUrl } : null} />
                

                </FeedCommentContainer>

            </FeedFooter>
            

        </FeedContainer>
    )
}

export default Feed;