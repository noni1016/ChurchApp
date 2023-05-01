import React, {useState, useEffect} from 'react';
import { Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent, View } from 'react-native';
import styled from 'styled-components/native';

import LightCard from '@/Components/LightCard';

const MyLightContainer = styled.View`
  flex-direction: column;
  height: 320px;
  background-color: #FFFFFF;
  margin: 20px 0px 0px 0px; //상 우 하 좌
`;

const Header = styled.View`
    height: 15%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px 2px 15px; //상 우 하 좌
    /* background-color: #FF0000; */
`;

const Body = styled.View`
    height: 100%;
    flex: 1;
    flex-direction: row;
    align-items: center;;
    justify-content: center;
    width: ${Dimensions.get('window').width}px;
    padding: 0px 5px 0px 5px; //상 우 하 좌
    /* background-color: #00FF00; */
`;


const ShowMore = styled.Text`
    flex: 1;
    color: black;
    font-size: 28px;
    font-family: 'DoHyeon-Regular';
    text-align: right;
`;

const Title = styled.Text`
    flex: 9;
    color: black;
    font-size: 25px;
    font-family: 'DoHyeon-Regular';
`;

const InidicatorContainer = styled.View`
    height: 5%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* background-color: #FF0000; */
`;

const DataIndicator = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 4px;
  margin: 1px;
`;




const RecLightContainer = ({orgDatas}) => {

    var datas = orgDatas.length > 8 ? orgDatas.slice(0,7) : orgDatas;

    useEffect(() => {
        // console.log(datas.length);
    }, []);
    

    return (
        <MyLightContainer>
            <Header>
                <Title>번개 예고</Title>
                <ShowMore>></ShowMore>
            </Header>
            <Body>
                <ScrollView
                    horizontal={true}
                    // pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    >

                        {datas.map((data, index) => (
                            <LightCard data={datas[index]}></LightCard>
                        ))}

                        
                </ScrollView>
            </Body>
        </MyLightContainer>
        
    );

}

export default RecLightContainer;