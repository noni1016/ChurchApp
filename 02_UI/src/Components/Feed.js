import React, {useState, useEffect, useContext, createRef} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, TouchableOpacity, Alert} from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import { UserData } from '~/Context/User';
import Icon from 'react-native-vector-icons/Entypo';
import ActionSheet from 'react-native-actions-sheet';
import ActionSheetBtn from './ActionSheetBtn';
import ImageSize from 'react-native-image-size';

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

const Input = Styled.TextInput`
    width: 90%;
    height: 100%;
    background-color: transparent;
    padding: 0px;
    /* margin: 5px 0px 0px 10px; //상 우 하 좌 */
    border-bottom-width: 1px;
`;

const CommentInputContainer = Styled.View`
    flex-direction: row;
    width: 100%;
    height: 30px;
    /* padding: 0px 8px;     */
    margin: 0px;
    justify-content: space-evenly;
    align-items: center;
    background-color: transparent;
`;




const Feed = ({club, feed, onFeedChange, navigation}) => {

    const domain = useContext(DomainContext);
    const userData = useContext(UserData);
    let [feedAuthorData, setFeedAuthorData] = useState();
    let [feedAuthorImgUrl, setFeedAuthorImgUrl] = useState();
    let [feedImgUrl, setFeedImgUrl] = useState();
    let [feedComments, setFeedComments] = useState([]);
    let [firstCommentAuthor, setFirstCommentAuthor] = useState([]);
    let [resizedWidth, setResizedWidth] = useState();
    let [resizedHeight, setResizedHeight] = useState();
    let [commentInput, setCommentInput] = useState('');
    let [imgPathInServer, setImgPathInServer] = useState();
    const actionSheetRef = createRef();

    /* 댓글 불러오는 함수 */
    const GetFeedComments = () => {
        let sendFeedData = {groupId: feed.clubId, feedId: feed.id};
        fetch(domain + '/Churmmunity/GetFeedComments', {
            method: 'POST',
            body: JSON.stringify(sendFeedData),
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {setFeedComments(res);});

        // console.log('FeedComment!!!!', feedComments.length);
    }

    /* 초기 마운팅시 Author 정보, Feed 댓글들을 받아옴 */
    useEffect(() => {
        fetch(`${domain}/User/${feed.authorId}`).then(res => res.json()).then(res => {setFeedAuthorData(res[0])});
        fetch(`${domain}/Club/${club.id}/Feed/${feed.Id}/Comments`).then(res => res.json()).then(res => {setFeedComments(res);});  
    }, [])
    
    /* Author 의 프로필 이미지를 띄우기 위해 Url Set */
    useEffect(() => {
        if (feedAuthorData)
        {
            setFeedAuthorImgUrl(`${domain}/${feedAuthorData.photo}`);
        }
    }, [feedAuthorData]);

    /* 이미지가 있는 Content 를 지울 때 서버에 지울 이미지 경로를 전송하기 위해 Path 설정 --> Transaction 처리 필요*/
    // useEffect(() => {
    //     if (feed.contentImg) {
    //         setFeedImgUrl(`${domain}/${feed.contentImg}`);
    //         if (feed.contentImg)
    //         {
    //             let temp = feed.contentImg.split('/');
    //             setImgPathInServer(temp[temp.length - 1]);
    //         }
    //         else
    //         {
    //             setImgPathInServer(-1);
    //         }
    //     }
    // }, [feed])

    /* Feed Image 사이즈를 화면 너비에 맞게 조정 */
    useEffect(() => {
        if (domain && feedImgUrl != '')
        {
            ImageSize.getSize(url).then((size) => {
                let width = size.width;
                let height = size.height;
                if (width > Dimensions.get('window').width) {
                    setResizedWidth(Dimensions.get('window').width);
                    setResizedHeight(Dimensions.get('window').width / width * height);
                } else {
                    setResizedWidth(width);
                    setResizedHeight(height);
                }
            }, () => { console.log(`fail to get imgSize : ${feedImgUrl}`) })
        }
    }, [feedImgUrl])

    /* 첫번째 댓글을 보여줄 때 필요한 댓글 author 정보를 불러옴 */
    useEffect(() => {
        if (feedComments.length > 0) {
            fetch(`${domain}/User/${feedComments[0].authorId}`).then(res => res.json()).then(res => {setFirstCommentAuthor(res[0])});
        }
    }, [feedComments])

    /* 댓글 등록 */
    const AddInput = (text) => {
        let sendCommentData = {clubId: feed.clubId, feedId: feed.id, authorId: userData.id, text: text};
        fetch(domain + '/Churmmunity/FeedComments/', {
            method: 'POST',
            body: JSON.stringify(sendCommentData),            
            headers:{
                Accept: 'application/json', 'Content-Type': 'application/json'
            }
        })
        setCommentInput('');
        GetFeedComments();
    }

    const CommentTextHandler = (value) => {
        setCommentInput(value);
    }

    return (
        <FeedContainer>

            <FeedHeader>
                <Image style={{ backgroundColor: 'transparent', width: 50, height: 50}} source={feedAuthorImgUrl ? {uri: feedAuthorImgUrl } : null} />
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
                    <Icon name="dots-three-vertical" size={30} onPress={() => {alert(feed.id); actionSheetRef.current?.setModalVisible();}} />
                </HeaderOptionBtnContainer>
            </FeedHeader>
            <FeedBody>
                <FeedImgContainer>
                    <Image style={{ backgroundColor: 'transparent', width: resizedWidth, height: resizedHeight}} source={feedImgUrl ? {uri: feedImgUrl } : null} />
                </FeedImgContainer>
                <Text>{feed.contentText}</Text>
            </FeedBody>

            <FeedFooter>
                {feedComments.length > 0 ?
                    (<FeedCommentContainer>
                        <Image style={{ backgroundColor: 'transparent', width: 25, height: 25, marginRight: 10}} source={firstCommentAuthor.photo? {uri: `${domain}/${firstCommentAuthor.photo}` } : null} />
                        <Text><Text style={{marginRight: 10, fontWeight: 'bold'}}>{firstCommentAuthor.name}</Text>{feedComments[0].text}</Text>
                    </FeedCommentContainer>) : null}
                {feedComments.length > 1 ? 
                    (<TouchableOpacity 
                        style={{marginLeft: 10}} 
                        onPress={() => {navigation.navigate('Comments', {comments: feedComments, tabIdx: 1, navigation: navigation});}}>
                            <Text style={{fontWeight: 'bold'}}>더보기...</Text>
                    </TouchableOpacity>) : null}
                <CommentInputContainer>
                    <Image style={{ backgroundColor: 'transparent', width: 30, height: 30, marginRight: 10}} source={userData.photo? {uri: `${domain}/${userData.photo}` } : null} />
                    <Input 
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="댓글 추가"
                        returnKeyType="done"
                        onChangeText={CommentTextHandler}
                        value={commentInput}
                        onSubmitEditing={({nativeEvent}) => {
                            AddInput(nativeEvent.text);
                        }}
                    />
                </CommentInputContainer>
            </FeedFooter>

            <ActionSheet ref={actionSheetRef}>
                <View>
                    <ActionSheetBtn OnPressMethod={() => {navigation.navigate('EditFeed', {club: club, feed: feed, navigation: navigation});}}>Edit</ActionSheetBtn>
                    <ActionSheetBtn OnPressMethod={() => {
                        fetch(`${domain}/Churmmunity/Feed/${feed.id}/${imgPathInServer}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }).then((res) => res.json()).then((res) => {alert(`Delete Feed ${feed.id} ${res}`); actionSheetRef.current?.setModalVisible(false); onFeedChange();})}}>Delete</ActionSheetBtn>
                    <ActionSheetBtn OnPressMethod={() => actionSheetRef.current?.setModalVisible(false)}>Cancel</ActionSheetBtn>
                </View>
            </ActionSheet>
             

            

        </FeedContainer>
    )
}

export default Feed;