import React, {useLayoutEffect} from 'react';
import {Text, Button, ScrollView} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    justify-content: center;
    align-items: center;
`;

const DataInfo = styled.Text`
    font-size: 20px;
    text-align: left;
    margin: 10px;
    color: black;
`;


const MyAreaCommBox = ({data}) => {

    return (
        // <Text>Hello MyAreaCommBox~</Text>
        <Container>
            <DataInfo>{data.id}</DataInfo>
            <DataInfo>{data.name}</DataInfo>
        </Container>
    );
  };
  
  
  export default MyAreaCommBox;