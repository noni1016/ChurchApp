import React, {useState, useEffect, useContext} from 'react';
import {View, Image, Text} from 'react-native';
import {DomainContext} from '~/Context/Domain';
import Styled from 'styled-components/native';

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
    const [commentAuthor, setCommentAuthor] = useState([]);

    useEffect(() => {
        fetch(`${domain}/User/${data.authorId}`).then(res => res.json()).then(res => {setCommentAuthor(res[0])});
    }, [data]);

    return (
        <Container>
            <Image style={{ backgroundColor: 'transparent', width: 50, height: 50, resizeMode: 'contain', marginRight: 10}} source={commentAuthor.photo? {uri: `${domain}/${commentAuthor.photo}` } : null} />
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
  