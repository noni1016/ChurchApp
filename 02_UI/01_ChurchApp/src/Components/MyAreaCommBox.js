import React, {useLayoutEffect} from 'react';
import {Text, Button, Image} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px 20px 20px 10px;
    padding: 5px;
    border-bottom-color: #000;
    border-bottom-width: 1px;
`;

const CommContentBox = styled.View`
    flex: 3;
    padding: 1px;
`;

const MainImgBox = styled.View`
    flex: 1;
    padding: 1px;
    border-radius: 3px;
    justify-content: center;
    align-items: center;
`;

const DataInfo = styled.Text`
    font-size: 10px;
    text-align: left;
    color: black;
`;

const CommTitle = styled.Text`
    font-size: 20px;
    text-align: left;
    color: black;
`;

const CommCategoryBox = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const CommCategoryContent = styled.Text`
    font-size: 10px;
    text-align: center;
    color: black;
    border: 1px;
    margin: 2px;
`;



const MyAreaCommBox = ({data}) => {

    console.log(data.mainImg);

    return (
        // <Text>Hello MyAreaCommBox~</Text>
        <Container>
            <CommContentBox>
                <CommTitle>[{data.area}]{data.name} ({data.numMember})</CommTitle>
                <CommCategoryBox>
                    {data.category.map((data, i) => (<CommCategoryContent>{data}</CommCategoryContent>))}
                    
                </CommCategoryBox>
                <DataInfo>{data.desc}</DataInfo>
            </CommContentBox>
            <MainImgBox>
                <Image source={data.mainImg} />
            </MainImgBox>
        </Container>
    );
  };
  
  
  export default MyAreaCommBox;