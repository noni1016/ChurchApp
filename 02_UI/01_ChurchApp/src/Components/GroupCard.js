import React, {useEffect, useContext, useState} from 'react';
import {Text, Button, Image, StyleSheet, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';


const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: flex-start; 
    background-color: #FFFFFF;
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
    font-size: 25px;
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
    font-size: 15px;
    font-family: 'DoHyeon-Regular';
    text-align: right;
`;

const LocationContainer = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    margin: 3px 0px 0px 0px; //상 우 하 좌
    /* background-color: #0000FF; */    
`;

const GroupLocation = styled.Text`
    color: black;
    font-size: 15px;
    font-family: 'DoHyeon-Regular';
    text-align: left;
`;

const MainImageContainer = styled.View`
    flex-direction: row;
    width: ${Dimensions.get('window').width * 0.9}px;
    justify-content: center;
    align-items: center;
    /* background-color: #0000FF;     */
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
        console.log(`${domain}/${data.mainImg}`);
        setUrl(`${domain}/${data.mainImg}`);
        Image.getSize(url, (width, height) => {
            console.log(width + ' - ' + height);
            setImgWidth(width);
            setImgHeight(height);
            if(width > Dimensions.get('window').width * 0.9) {
                setResizedWidth(Dimensions.get('window').width * 0.9);
                setResizedHeight(Dimensions.get('window').width * 0.9 / width * height);
            } else {
                setResizedWidth(width);
                setResizedHeight(height);
            }

            console.log(resizedWidth + ' - ' + resizedHeight);

        })

    });


    return (
        <Container width='90%'>
            <MainImageContainer>
                <Image style={{backgroundColor: '#FFFFFF', width: resizedWidth, height: resizedHeight, resizeMode: 'contain'}} source={{uri: url}} />
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
            
        </Container>
    );
  };
  
  
  export default GroupCard;