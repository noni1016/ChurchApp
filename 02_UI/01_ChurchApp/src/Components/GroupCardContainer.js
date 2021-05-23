import React, {useState, useEffect} from 'react';
import { Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';

import GroupCard from '~/Components/GroupCard';

const MyGroupContainer = styled.View`
  flex-direction: column;
  height: 350px;
  background-color: #FFFFFF;
  margin: 10px 0px 0px 0px; //상 우 하 좌
`;

const Header = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px 2px 15px; //상 우 하 좌
    /* background-color: #FF0000; */
`;

const Body = styled.View`
    flex: 6;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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


const GroupCardContainer = ({data}) => {

    // console.log(data[0]);
    const [indicatorIndex, setIndicatorIndex] = useState(0);
    const dataLength = data.length;

    useEffect(() => {
        console.log(data.length);
    }, []);
    

    return (
        <MyGroupContainer>
            <Header>
                <Title>내 모임</Title>
                <ShowMore>></ShowMore>
            </Header>
            <Body>
                {/* <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={dataLength > 1}
                    onScroll={(event) => {
                        setIndicatorIndex(
                            Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
                        );
                    }}>
                        {data.map((group, index) => (
                            <GroupCard data={group}></GroupCard>
                        ))}
                </ScrollView> */}
                <GroupCard data={data[0]}></GroupCard>
            </Body>



        </MyGroupContainer>
        
    );

}

export default GroupCardContainer;