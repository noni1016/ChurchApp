import React, {useState, useEffect} from 'react';
import { Dimensions, ScrollView, Text } from 'react-native';
import Styled from 'styled-components/native';
import SpotCard from './SpotCard';


const SpotCardBox = Styled.View`
  flex-direction: column;
  height: 320px;
  background-color: #FFFFFF;
  margin: 20px 0px 0px 0px; //상 우 하 좌
`;

const Header = Styled.View`
    height: 15%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px 2px 15px;
    /* background-color: #FF0000; */
`;

const Body = Styled.TouchableOpacity`
    height: 100%;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${Dimensions.get('window').width / 2}px;
    /* background-color: #ffff00; */
    /* border-color: black; */
    /* border-width: 2px; */
`;


const ShowMore = Styled.Text`
    flex: 1;
    color: black;
    font-size: 28px;
    font-family: 'DoHyeon-Regular';
    text-align: right;
`;

const Title = Styled.Text`
    flex: 9;
    height: 90%
    color: black;
    font-size: 25px;
    font-family: 'DoHyeon-Regular';
`;

const InidicatorBox = Styled.View`
    height: 5%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* background-color: #FF0000; */
`;

const DataIndicator = Styled.View`
  width: 6px;
  height: 6px;
  border-radius: 4px;
  margin: 1px;
`;


const SpotCards = ({title, orgDatas, stackNavi}) => {

    const [indicatorIdx, setIndicatorIdx] = useState(0);
    var datas = orgDatas.length > 8 ? orgDatas.slice(0,7) : orgDatas;
    const dataLength = datas.length;    
    
    const dataIndicator = (indicatorIdx) => {
        let arr = [];
        for (let i = 0; i < datas.length / 2; i++)
        {
            arr.push(
                <DataIndicator
                    key={`data-${i}`}
                    style={{
                        backgroundColor:
                            indicatorIdx >= i && indicatorIdx < i + 1
                                ? '#3769EF'
                                : '#D3D3D3',
                    }}
                />
            )
        }

        return arr;        
    }

    return (
        <SpotCardBox>
            <Header>
                <Title>{title}</Title>
                <ShowMore
                    onPress={() => {
                        stackNavi.navigate('ShowMoreClubs', {title: '내 모임', clubs: datas});
                    }}>></ShowMore>
            </Header>
                <ScrollView 
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={dataLength > 1}
                    onScroll={(event) => {
                        setIndicatorIdx(
                            Math.round(event.nativeEvent.contentOffset.x / (Dimensions.get('window').width))
                        );
                    }}>
                        {datas.map((data, index) => (
                             <Body activeOpacity={1} key={index} onPress = {() => {stackNavi.navigate('ClubPage', {club : data});}} > 
                                <SpotCard spot={data} />
                            </Body> 
                        ))}
                </ScrollView>
                <InidicatorBox>
                    {dataLength > 1 && dataIndicator(indicatorIdx)}
                </InidicatorBox>
        </SpotCardBox>        
    );

}

export default SpotCards;