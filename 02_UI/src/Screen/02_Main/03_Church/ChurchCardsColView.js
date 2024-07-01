import React, { useEffect, useContext, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Styled from 'styled-components/native';
import ChurchCard from '~/Components/ChurchCard';

const CardsColViewBox = Styled.View`
  /* background-color: blue; */
  margin: 0px 0px 0px 10px; //╩С ©Л го аб
  justify-content: center;
  align-items: center;
  width: 95%;
`;

const FlatListItemSeparator = () => {
    return(<View style={{height: 20, width: '100%', backgroundColor: 'transparent'}}/>)
}

const ChurchCardsColView = ({route, navigation}) => {

    let title = route.params.title;
    let churches = route.params.churches;
    let [refreshing, setRefreshing] = useState(false);

    navigation.setOptions({title: title});

    const getRefreshData = async () => {
        setRefreshing(true);
        await route.params.refreshDataFetch();
        setRefreshing(false);
    }

    const onRefresh = () => {
        if(!refreshing) {
            getRefreshData();
        }
    }

    return (
        <CardsColViewBox>
            {FlatListItemSeparator}
            <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{width: '100%'}}
                data={churches}
                keyExtractor={(item, index) => {
                    return `myData-${index}`;
                }}
                renderItem={({ item, index }) => (
                        <ChurchCard church={item} navigation={navigation}/>
                )}
                ItemSeparatorComponent={FlatListItemSeparator}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        </CardsColViewBox>
    )
};

export default ChurchCardsColView;