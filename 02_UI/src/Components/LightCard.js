import React, {useEffect, useContext, useState} from 'react';
import {Text, Button, Image, StyleSheet, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

const adjWidth = 0.45;
const adjHeight = 0.4;

const Container = styled.View`
    flex-direction: column;
    width : ${Dimensions.get('window').width * adjWidth}px;
    justify-content: center;
    align-items: center; 
    background-color: transparent;
    margin: 0px ${Dimensions.get('window').width * (1-adjWidth*2) / 4}px 0px ${Dimensions.get('window').width * (1-adjWidth*2) / 4}px; //상 우 하 좌
`;

const GroupTitleAndNumMem = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* background-color: #FF0000; */    
    margin: 5px 0px 0px 0px; //상 우 하 좌
`;

const GroupTitle = styled.Text`
    flex: 9;
    color: black;
    font-size: 18px;
    font-family: 'DoHyeon-Regular';
    /* align-items: flex-start; */
    text-align: left;
    /* background-color: #0000FF; */
`;

const GroupNumContainer = styled.View`
    flex-direction: row;
`;

const GroupNumMem = styled.Text`
    color: black;
    font-size: 13px;
    font-family: 'DoHyeon-Regular';
    text-align: right;
`;

const LocationContainer = styled.View`
    flex-direction: row;
    /* flex: 1; */
    justify-content: flex-start;
    align-items: center;
    margin: 3px 0px 0px 0px; //상 우 하 좌
    /* background-color: #0000FF; */    
`;

const GroupLocation = styled.Text`
    color: black;
    font-size: 13px;
    font-family: 'DoHyeon-Regular';
    text-align: left;
    flex: 1;
`;

const MainImageContainer = styled.View`
    flex-direction: row;
    width: ${Dimensions.get('window').width * adjWidth}px;
    justify-content: center;
    align-items: center;
    background-color: transparent;    
`;

const TimeContainer = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 3px 0px 0px 0px; //상 우 하 좌
    /* background-color: #0000FF; */    
`;



const GroupCard = ({data}) => {

    const domain = useContext(DomainContext);
       
    // const imageWidth = Dimensions.get('window').width * 0.8;
    var [imgWidth, setImgWidth] = useState();
    var [imgHeight, setImgHeight] = useState();
    
    var [resizedWidth, setResizedWidth] = useState(100);
    var [resizedHeight, setResizedHeight] = useState(100);


    var [url, setUrl] = useState('');

    useEffect(() => {
        // console.log(`${domain}/${data.mainImg}`);
        setUrl(`${domain}/${data.mainImg}`);
        Image.getSize(url, (width, height) => {
            console.log(width + ' - ' + height);
            setImgWidth(width);
            setImgHeight(height);
            if(width > Dimensions.get('window').width * adjWidth) {
                setResizedWidth(Dimensions.get('window').width * adjWidth);
                setResizedHeight(Dimensions.get('window').width * adjWidth / width * height);
            } else {
                setResizedWidth(Dimensions.get('window').width * adjWidth);
                setResizedHeight(Dimensions.get('window').width * adjWidth);
            }

            // console.log(resizedWidth + ' - ' + resizedHeight);

        })

    });


    return (
        <Container>
            <MainImageContainer>
                <Image style={{backgroundColor: 'transparent', width: resizedWidth, height: resizedHeight, resizeMode: 'stretch'}} source={{uri: url}} />
            </MainImageContainer>
            <GroupTitleAndNumMem>
                <GroupTitle>{data.name}</GroupTitle>
                <GroupNumContainer>
                    <IconM name="human-child" size={15} color="#000000" />
                    <GroupNumMem>{data.numMember}</GroupNumMem>
                </GroupNumContainer>
            </GroupTitleAndNumMem>
            <LocationContainer>
                <IconE name="location-pin" size={15} color="#000000" />
                <GroupLocation>{data.location}</GroupLocation>
            </LocationContainer>
            <TimeContainer>
                <IconM name="clock-time-eight-outline" size={15} color="#000000" />
                {data.time && <GroupLocation> {data.time.slice(0,10)}, {data.time.slice(11,16)} </GroupLocation>}                    
            </TimeContainer>
            
        </Container>
    );
  };
  
  
  export default GroupCard;