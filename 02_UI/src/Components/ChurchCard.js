import React, { useState, useEffect, useContext } from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import Styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';

const ContainerBox = Styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background-color: #f0ffff;
    margin: 5px;
`;

const ImageBox = Styled.Image`
    flex: 2;
    width: 80px;
    height: 80px;
    border-radius: 25px;
    border-color: black;
    border: 3px;
    margin: 5px;
`;

const ChurchInfoBox = Styled.View`
    flex: 7;
    flex-direction: column;
    font-family: 'DoHyeon-Regular'; 
    margin: 5px;
    /* background-color: green; */
`;

const ChurchNameBox = Styled.View`
    flex: 1;
    margin-top: 10px;
    /* background-color: blue; */
`;

const LocationPastorBox = Styled.View`
    flex: 1;
    flex-direction: row;
    margin: 0px 5px 5px 2px;
    /* background-color: red; */
`;

const NumMember = Styled.View`
    flex: 1;
    /* margin: 5px; */
    /* background-color: yellow; */
`;


const ChurchCard = ({church}) => {
    const domain = useContext(DomainContext);

    return (
        <ContainerBox>
            <ImageBox source={{uri: `${domain}/ChurchMainImg/${church.mainImg}`}}/>
            <ChurchInfoBox>
                <ChurchNameBox>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{church.name}</Text>
                    </ChurchNameBox>
                <LocationPastorBox>
                    <Text style={{fontSize: 15, marginRight: 10}}>{church.location}</Text>
                    <Text style={{fontSize: 15, marginRight: 10}}>/</Text>
                    <Text style={{fontSize: 15}}>{church.pastor} 목사</Text>
                </LocationPastorBox>
            </ChurchInfoBox>
            <NumMember>
                <Text>{church.numMember} 명</Text>
            </NumMember>
        </ContainerBox>
    )

};

export default ChurchCard;