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
    justify-content: flex-start;
    background-color: transparent;
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




const Feed = ({feed}) => {

    const domain = useContext(DomainContext);
    let [feedAuthorData, setFeedAuthorData] = useState();
    let [feedAuthorImgUrl, setFeedAuthorImgUrl] = useState('');
    let [feedImgUrl, setFeedImgUrl] = useState('');
    let [feedComments, setFeedComments] = useState([]);
    let [firstCommentAuthor, setFirstCommentAuthor] = useState([]);
    let [resizedWidth, setResizedWidth] = useState();
    let [resizedHeight, setResizedHeight] = useState();

    useEffect(() => {
        // console.log(feed);
        let sendUserData = {userId: feed.authorId};
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
        if (domain && feedImgUrl != '')
        {
            Image.getSize(feedImgUrl, (width, height) => {
                // console.log(width + ' - ' + height);
                // setImgWidth(width);
                // setImgHeight(height);
                    setResizedWidth(Dimensions.get('window').width * 0.95);
                    setResizedHeight((Dimensions.get('window').width * 0.95) / width * height);
    
                // console.log(resizedWidth + ' - ' + resizedHeight);
    
            })
        }
    })

    useEffect(() => {
        if (feed.contentImg) {
            // console.log(`${domain}/${feed.contentImg}`);
            setFeedImgUrl(`${domain}/${feed.contentImg}`);
        }
    })

    useEffect(() => {
        let sendFeedData = {groupId: feed.groupId, feedId: feed.id};
        fetch(domain + '/Churmmunity/GetFeedComments', {
            method: 'POST',
            body: JSON.stringify(sendFeedData),
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {setFeedComments(res);});
        // console.log('FeedComment!!!!', feedComments.length);
    }, [])

    useEffect(() => {
        if (feedComments.length > 0) {
            let sendCommentUserData = {userId: feedComments[0].authorId};
            fetch(domain + '/Churmmunity/GetCommentAuthorData', {
                method: 'POST',
                body: JSON.stringify(sendCommentUserData),
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(res => {console.log(res);setFirstCommentAuthor(res[0]);});
            // console.log('FeedComment!!!!', feedComments.length);
        }

    }, [feedComments])

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
                    {feed.location} - {feed.time}
                    </Text>
                </HeaderInfo>
                <HeaderOptionBtnContainer>
                    <Icon name="dots-three-vertical" size={30} onPress={() => alert('This is a dots-three-vertical button!')} />
                </HeaderOptionBtnContainer>
            </FeedHeader>
            <FeedBody>
                <FeedImgContainer>
                    <Image style={{ backgroundColor: 'transparent', width: resizedWidth, height: resizedHeight, resizeMode: 'contain' }} source={feedImgUrl ? {uri: feedImgUrl } : null} />
                </FeedImgContainer>
                <Text>{feed.contentText}</Text>
            </FeedBody>

            <FeedFooter>
                <FeedCommentContainer>
                    <Image style={{ backgroundColor: 'transparent', width: 25, height: 25, resizeMode: 'contain' }} source={feedAuthorImgUrl ? {uri: feedAuthorImgUrl } : null} />
                    {feedComments.length > 1 ? 
                    (<View>
                        <Text>{firstCommentAuthor.name}</Text>
                        <Text>{feedComments[0].text}</Text>
                        <Text>더보기...</Text>
                    </View>)
                    :
                    feedComments.length == 1 ?
                    (<Text>{feedComments[0].text}</Text>)
                    : null}
                </FeedCommentContainer>

            </FeedFooter>
            

        </FeedContainer>
    )
}

export default Feed;