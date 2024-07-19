import React, {useState, useEffect, useContext, createRef} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, TouchableOpacity, Alert} from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import { UserData } from '~/Context/User';
import Icon from 'react-native-vector-icons/Entypo';
import ActionSheet from 'react-native-actions-sheet';
import ActionSheetBtn from './ActionSheetBtn';
import ImageSize from 'react-native-image-size';
import { TabNavi } from '~/Context/Navi';

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




const Feed = ({groupType, group, feed, isMember, reload, setReload, navigation}) => {
    const domain = useContext(DomainContext);
    const {userData} = useContext(UserData);
    let [feedAuthorData, setFeedAuthorData] = useState();
    let [feedAuthorImgUrl, setFeedAuthorImgUrl] = useState();
    let [feedImgUrl, setFeedImgUrl] = useState();
    let [feedComments, setFeedComments] = useState([]);
    let [firstCommentAuthor, setFirstCommentAuthor] = useState([]);
    let [resizedWidth, setResizedWidth] = useState();
    let [resizedHeight, setResizedHeight] = useState();
    let [commentInput, setCommentInput] = useState('');
    let [commentPlaceHolder, setCommentPlaceHolder] = useState("댓글을 쓰려면 먼저 교회 회원으로 등록하세요");
    const actionSheetRef = createRef();
    const {tabNavi} = useContext(TabNavi);

    /* 초기 마운팅시 Author 정보, Feed 댓글들을 받아옴 */
    useEffect(() => {
        fetch(`${domain}/User/${feed.authorId}`).then(res => res.json()).then(res => {setFeedAuthorData(res[0])});
        fetch(`${domain}/${groupType}/${group.id}/Feed/${feed.id}/Comments`).then(res => res.json()).then(res => {setFeedComments(res);});  
    }, [feed])
    
    useEffect(() => {
        if (feed.contentImg) {
            setFeedImgUrl(`${domain}/${feed.contentImg}`+ "?cache="+Math.random());
        }
    }, [feed])

    /* Feed Image 사이즈를 화면 너비에 맞게 조정 */
    useEffect(() => {
        if (domain && feedImgUrl != '')
        {
            ImageSize.getSize(feedImgUrl).then((size) => {
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
        let sendCommentData = {authorId: userData.id, text: text};
        let groupId = 0;
        if (groupType == 'Club') groupId = feed.clubId;
        else if (groupType == 'Church') groupId = feed.churchId;
        else groupId = 0;
        fetch(`${domain}/${groupType}/${groupId}/Feed/${feed.id}/Comment`, {
            method: 'POST',
            body: JSON.stringify(sendCommentData),            
            headers:{
                Accept: 'application/json', 'Content-Type': 'application/json'
            }
        })
        setCommentInput('');
        fetch(`${domain}/${groupType}/${group.id}/Feed/${feed.id}/Comments`).then(res => res.json()).then(res => {setFeedComments(res);});  
    }

    /* 교회 회원만 댓글을 쓸 수 있음 */
    useEffect(() => {
        if(isMember) setCommentPlaceHolder("댓글 추가");
        else setCommentPlaceHolder("댓글을 쓰려면 먼저 교회 회원으로 등록하세요");
    }, [isMember])

    return (
        <FeedContainer>
            <FeedHeader>
                <TouchableOpacity onPress={() => {
                    if (feedAuthorData.id == userData.id) tabNavi.navigate('Profile', {member: feedAuthorData});
                    else navigation.navigate('Profile', {member: feedAuthorData});
                }}>
                    <Image style={{ backgroundColor: 'transparent', width: 50, height: 50}} source={feedAuthorData ? {uri: `${domain}/Profile/${feedAuthorData.photo}` + "?cache="+Math.random()} : null } />
                </TouchableOpacity>
                <HeaderInfo>
                    {feedAuthorData && 
                        (<TouchableOpacity onPress={() => {
                            if (feedAuthorData.id == userData.id) tabNavi.navigate('Profile', {member: feedAuthorData});
                            else navigation.navigate('Profile', {member: feedAuthorData});
                        }}>
                            <Text style={{fontWeight: 'bold', fontSize: 18}}>
                                {feedAuthorData.name}
                            </Text>
                        </TouchableOpacity>)}
                    <Text>
                    {feed.location} - {feed.time}
                    </Text>
                </HeaderInfo>
                <HeaderOptionBtnContainer>
                    <Icon name="dots-three-vertical" size={30} onPress={() => {actionSheetRef.current?.setModalVisible(1); }} />
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
                        <Image style={{ backgroundColor: 'transparent', width: 25, height: 25, marginRight: 10}} source={firstCommentAuthor.photo? {uri: `${domain}/Profile/${firstCommentAuthor.photo}` } : null} />
                        <Text><Text style={{marginRight: 10, fontWeight: 'bold'}}>{firstCommentAuthor.name}</Text>{feedComments[0].text}</Text>
                    </FeedCommentContainer>) : null}
                {feedComments.length > 1 ? 
                    (<TouchableOpacity 
                        style={{marginLeft: 10}} 
                        onPress={() => {navigation.navigate('Comments', {comments: feedComments, tabIdx: 1, navigation: navigation});}}>
                            <Text style={{fontWeight: 'bold'}}>더보기...</Text>
                    </TouchableOpacity>) : null}
                <CommentInputContainer>
                    <Image style={{ backgroundColor: 'transparent', width: 30, height: 30, marginRight: 10}} source={userData.photo? {uri: userData.photoUrl } : null} />
                    <Input 
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder={commentPlaceHolder}
                        returnKeyType="done"
                        onChangeText={(value) => {
                            if(isMember) setCommentInput(value)}}
                        value={commentInput}
                        onSubmitEditing={({nativeEvent}) => {
                            if(isMember) AddInput(nativeEvent.text);
                        }}
                    />
                </CommentInputContainer>
            </FeedFooter>

            <ActionSheet ref={actionSheetRef}>
                <View>
                    <ActionSheetBtn OnPressMethod={() => {navigation.navigate('EditFeed', {edit: true, groupType: groupType, group: group, feed: feed, reload: reload, setReload: setReload, navigation: navigation});}}>Edit</ActionSheetBtn>
                    <ActionSheetBtn OnPressMethod={() => {
                        fetch(`${domain}/${groupType}/${group.id}/Feed/${feed.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }).then((res) => res.json()).then((res) => {alert(`Delete Feed ${feed.id} ${res}`); actionSheetRef.current?.setModalVisible(false); setReload(!reload);})}}>Delete</ActionSheetBtn>
                    <ActionSheetBtn OnPressMethod={() => actionSheetRef.current?.setModalVisible(false)}>Cancel</ActionSheetBtn>
                </View>
            </ActionSheet>

        </FeedContainer>
    )
}

export default Feed;