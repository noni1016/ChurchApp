import React, {useState, useEffect, useContext} from 'react';
import {View, Image, Text} from 'react-native';
import {DomainContext} from '~/Context/Domain';
import Styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TabNavi } from '~/Context/Navi';
import {UserData} from '~/Context/User';

const Container = Styled.View`
    flex-direction: row;
    width: 80%;
    justify-content: flex-start;
    margin: 5px 5px 5px 5px; //상 우 하 좌
`;

const Data = Styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 5px;
`;


const Comment = ({data, navigation}) => {
    const domain = useContext(DomainContext);
    const {userData, setUserData} = useContext(UserData);
    const [commentAuthor, setCommentAuthor] = useState([]);
    const {tabNavi} = useContext(TabNavi);

    useEffect(() => {
        fetch(`${domain}/User/${data.authorId}`).then(res => res.json()).then(res => {setCommentAuthor(res[0])});
    }, [data]);

    return (
        <Container>
            <TouchableOpacity onPress={() => {
                if (commentAuthor.id == userData.id) tabNavi.navigate('Profile', {member: commentAuthor});
                else stackNavi.navigate('Profile', {member: commentAuthor});}}>
                <Image style={{ backgroundColor: 'transparent', width: 50, height: 50, resizeMode: 'contain', marginRight: 10}} source={commentAuthor.photo? {uri: `${domain}/Profile/${commentAuthor.photo}` } : null} />
            </TouchableOpacity>
            <Data>
                <Text>
                    <Text style={{marginRight: 10, fontWeight: 'bold'}}>{commentAuthor.name}</Text> {data.text}
                </Text>
                <Text style={{color: 'grey'}}>{data.time.slice(2, -3)}</Text>
            </Data>
        </Container>
    );  
}

export default Comment;
  