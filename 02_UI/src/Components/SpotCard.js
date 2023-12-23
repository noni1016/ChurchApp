import React, {useEffect, useContext, useState} from 'react';
import {Image, Dimensions} from 'react-native';
import Styled, {css} from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import ImageSize from 'react-native-image-size';


const SpotCardBox = Styled.View`
    width: 90%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start; 
    /* background-color: #FF0000; */
`;

const SpotTitleAndNumMem = Styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* background-color: #FF0000;     */
    margin: 5px 0px 0px 0px; //상 우 하 좌
`;

const SpotTitle = Styled.Text`
    flex: 9;
    color: black;
    font-size: 25px;
    font-family: 'DoHyeon-Regular';
    /* align-items: flex-start; */
    text-align: left;
    /* background-color: #0000FF; */
`;

const SpotNumBox = Styled.View`
    flex-direction: row;
`;

const SpotNumMem = Styled.Text`
    color: black;
    font-size: 15px;
    font-family: 'DoHyeon-Regular';
    text-align: right;
`;

const LocationBox = Styled.View`
    flex-direction: row;
    justify-content: flex-start;
    margin: 3px 0px 0px 0px; //상 우 하 좌
    /* background-color: #0000FF; */    
`;

const SpotLocation = Styled.Text`
    color: black;
    font-size: 15px;
    font-family: 'DoHyeon-Regular';
    text-align: left;
    text-wrap: wrap;
    width: 90%;
`;

const MainImageBox = Styled.View`
    flex-direction: row;
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
    /* background-color: #0000FF;      */
`;


const SpotCard = ({spot}) => {

    const domain = useContext(DomainContext);
    
    var [resizedWidth, setResizedWidth] = useState(100);
    var [resizedHeight, setResizedHeight] = useState(100);

    var [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(`${domain}/SpotMainImg/${spot.mainImg}`);
    }, [spot]);

    useEffect(() => {
        if (url) {
            ImageSize.getSize(url).then(size => {
                if (size.width > Dimensions.get('window').width * 0.9) {
                    setResizedWidth(Dimensions.get('window').width * 0.9);
                    setResizedHeight(Dimensions.get('window').width * 0.9 / size.width * size.height);
                } else {
                    setResizedWidth(size.width);
                    setResizedHeight(size.height);
                }
            })
        }
    }, [url]);



    return (
        <SpotCardBox>
            <MainImageBox>
                {/* <Image style={{backgroundColor: '#FFFFFF', width: resizedWidth, height: resizedHeight, resizeMode: 'contain'}} source={url ? {uri: url } : null} /> */}
                <Image style={{backgroundColor: '#FFFFFF', width: '100%', height: '100%', resizeMode: 'cover'}} source={url ? {uri: url } : null} />
            </MainImageBox>
            <SpotTitleAndNumMem>
                <SpotTitle>{spot.name}</SpotTitle>
                <SpotNumBox>
                    <IconM name="human-child" size={15} color="#000000" />
                    <SpotNumMem>{spot.numMember}</SpotNumMem>
                </SpotNumBox>
            </SpotTitleAndNumMem>
            <LocationBox>
                <IconI name="time" size={15} color="#000000" />
                <SpotLocation>{spot.time}</SpotLocation>
            </LocationBox>
            <LocationBox style={{backgroundColor: "transparent"}}>
                <IconE name="location-pin" size={15} color="#000000" />
                <SpotLocation>{spot.location}</SpotLocation>
            </LocationBox>            
        </SpotCardBox>
    );
  };
  
  
  export default SpotCard;