import React, {useState, useEffect, useContext} from 'react';
import { Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';
import {DataContext} from '~/Context/Data';

import GroupCard from '~/Components/GroupCard';

var initGroupData = { id: 0, name: `꺄아아아`, mainImg: `WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg`, location: `수원시 영통구 매탄4동 10`, numMember: 10 };


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

const Body = styled.TouchableOpacity`
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


const GroupCardContainer = ({datas, navigation}) => {

    // const DataContext = useContext(DataContext);
    const {showMoreMode, setShowMoreMode} = useContext(DataContext);

    // console.log(data[0]);
    const [indicatorIndex, setIndicatorIndex] = useState(0);
    const dataLength = datas.length;

    useEffect(() => {
        console.log(`Data Length : ${datas.length}`);
    }, []);
    

    return (
        <MyGroupContainer>
            <Header>
                <Title>내 모임</Title>
                <ShowMore
                    onPress={() => {
                        setShowMoreMode(0);
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
                            <Body activeOpacity={1} onPress = {() => {alert(data.name);}}>
                                <GroupCard 
                                    data={data}
                                
                                ></GroupCard>
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

export default GroupCardContainer;