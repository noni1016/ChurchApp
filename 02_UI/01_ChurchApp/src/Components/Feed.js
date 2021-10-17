import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, TouchableOpacity} from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import Icon from 'react-native-vector-icons/Entypo';
import Comments from '~/Screen/Comments';

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
    background-color: transparent;
    border-color: grey;
    border-bottom-width: 1px;
    padding: 0px 0px 10px 0px; //상 우 하 좌
`;

const FeedCommentContainer = Styled.View`
    flex-direction: row;
    width: 90%;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: transparent;
`;



const Feed = ({feed, navigation}) => {

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
            }).then(res => res.json()).then(res => {setFirstCommentAuthor(res[0]);});
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
                {feedComments.length > 0 ?
                    (<FeedCommentContainer>
                        <Image style={{ backgroundColor: 'transparent', width: 25, height: 25, resizeMode: 'contain', marginRight: 10}} source={firstCommentAuthor.photo? {uri: `${domain}/${firstCommentAuthor.photo}` } : null} />
                        <Text><Text style={{marginRight: 10, fontWeight: 'bold'}}>{firstCommentAuthor.name}</Text>{feedComments[0].text}</Text>
                    </FeedCommentContainer>) : null}
                {feedComments.length > 1 ? 
                    (<TouchableOpacity 
                        style={{marginLeft: 10}} 
                        onPress={() => {navigation.navigate('Comments', {comments: feedComments, navigation: navigation});}}>
                            <Text style={{fontWeight: 'bold'}}>더보기...</Text>
                    </TouchableOpacity>) : null}
            </FeedFooter>
            

        </FeedContainer>
    )
}

export default Feed;