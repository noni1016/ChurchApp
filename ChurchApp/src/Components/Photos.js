import React, {useState, useEffect, useContext, createRef} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, TouchableOpacity, Alert} from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '@/Context/Domain';
import ImageSize from 'react-native-image-size';
import Photo from '@/Components/Photo'

const PhotosBox = Styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const Photos = ({club}) => {
    const domain = useContext(DomainContext);
    const [clubImgs, setClubImgs] = useState([]);

    /* 마운팅 시 Club 의 모든 사진을 받아옴 */
    useEffect(() => {
        fetch(`${domain}/Club/${club.id}/Imgs`).then(res => res.json()).then(res => {setClubImgs(res);});   
    }, [club])

    clubImgs.map((img, i) => console.log(img));

    return (
        <PhotosBox>
            {clubImgs.map((img, i) => (<Photo img={domain+img.contentImg} key={i} />))}
        </PhotosBox>
    )

}
export default Photos;