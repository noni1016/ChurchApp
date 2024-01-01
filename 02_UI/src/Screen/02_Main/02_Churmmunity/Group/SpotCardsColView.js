import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Styled from 'styled-components/native';
import SpotCard from '~/Components/SpotCard';

const SpotCardsColViewBox = Styled.View`
  background-color: #FFFFFF;
  /* margin: 0px 10px 0px 10px; //상 우 하 좌 */
  justify-content: center;
  align-items: center;
`;

const FlatListItemSeparator = () => {
    return(<View style={{height: 20, width: '100%', backgroundColor: 'yellow'}}/>)
}

const SpotCardsColView = ({route, navigation}) => {

    let title = route.params.title;
    let spots = route.params.spots;
    navigation.setOptions({title: title});

    // useEffect(() => {
    //     navigation.setOptions({title: title});
    // },[]);

    return (
        <SpotCardsColViewBox>
            {FlatListItemSeparator}
            <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{width: '100%', alignItems: 'center'}}
                data={spots}
                keyExtractor={(item, index) => {
                    return `myData-${index}`;
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress = {() => {
                        navigation.navigate('SpotPage', {spot : item, navigation: navigation, tabNavi: route.params.tabNavi});
                    }}>
                        <SpotCard spot={item}></SpotCard>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={FlatListItemSeparator}
            />
        </SpotCardsColViewBox>
    )
};

export default SpotCardsColView;