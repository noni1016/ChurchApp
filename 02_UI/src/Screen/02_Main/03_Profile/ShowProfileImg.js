import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import {UserData} from '~/Context/User';

const ShowProfileImg = ({navigation}) => {

    const domain = useContext(DomainContext);
    const {userData} = useContext(UserData);

    console.log(userData.photo);

    return (
        <Image style={{width: "100%", height: "100%", resizeMode: 'contain'}} source={{uri: `${domain}/Profile/${userData.photo}` + "?cache="+Math.random()}}/>
    )

}

export default ShowProfileImg;