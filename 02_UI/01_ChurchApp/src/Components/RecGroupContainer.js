import React, {useState, useEffect, useContext} from 'react';
import { Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';
import {DataContext} from '~/Context/Data';

import GroupCard from '~/Components/GroupCard';

const MyGroupContainer = styled.View`
  flex-direction: column;
  height: 350px;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${Dimensions.get('window').width}px;
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


const RecGroupContainer = ({orgDatas, navigation}) => {

    const {setShowMoreMode} = useContext(DataContext);
    const [indicatorIndex, setIndicatorIndex] = useState(0);

    var datas = orgDatas.length > 8 ? orgDatas.slice(0,7) : orgDatas;

    const dataLength = datas.length;

    useEffect(() => {
        console.log(datas.length);
    }, []);
    

    return (
        <MyGroupContainer>
            <Header>
                <Title>오늘의 모임</Title>
                <ShowMore
                    onPress={() => {
                        setShowMoreMode(2);
                        navigation.navigate('ShowMore');
                    }}>></ShowMore>
            </Header>
            {/* <Body> */}
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={dataLength > 1}
                    onScroll={(event) => {
                        setIndicatorIndex(
                            Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
                        );
                    }}>
                        {datas.map((data, index) => (
                            <Body>
                                <GroupCard data={data}></GroupCard>
                            </Body>
                        ))}
                </ScrollView>
                <InidicatorContainer>
                    {dataLength > 1 &&
                        datas.map((datas, index) => (
                            <DataIndicator
                                key={`data-${index}`}
                                style={{
                                    backgroundColor:
                                        indicatorIndex >= index && indicatorIndex < index + 1
                                            ? '#3769EF'
                                            : '#D3D3D3',
                                }}
                            />
                        ))}
                </InidicatorContainer>
                {/* <GroupCard data={data[0]}></GroupCard> */}
            {/* </Body> */}



        </MyGroupContainer>
        
    );

}

export default RecGroupContainer;