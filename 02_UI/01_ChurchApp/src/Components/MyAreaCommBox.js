import React, {useEffect, useContext, useState} from 'react';
import {Text, Button, Image} from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';

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

    const domain = useContext(DomainContext);
    console.log(`${domain}/${data.mainImg}`);

    var [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(`${domain}/${data.mainImg}`);
    }, []);

    return (
        // <Text>Hello MyAreaCommBox~</Text>
        <Container>
            <CommContentBox>
                <CommTitle>[{data.area}]{data.name} ({data.numMember})</CommTitle>
                <CommCategoryBox>
                    {/* {data.category.map((data, i) => (<CommCategoryContent>{data}</CommCategoryContent>))} */}
                    <CommCategoryContent>{data.category}</CommCategoryContent>
                </CommCategoryBox>
                <DataInfo>{data.desc}</DataInfo>
            </CommContentBox>
            <MainImgBox>
                <Image style={{flex: 1, alignSelf: 'stretch'}} source={{uri: url}} />
            </MainImgBox>
        </Container>
        // <Image style={{height:'100%',width:'100%'}} source={{uri: 'https://t1.daumcdn.net/cfile/tistory/9942214E5B5E76930B'}} />
        // <Image style={{height:'100%',width:'100%'}} source={{uri: 'http://175.212.209.93:7009/ins.png'}} />
    );
  };
  
  
  export default MyAreaCommBox;