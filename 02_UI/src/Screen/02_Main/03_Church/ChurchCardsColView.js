import React, { useEffect, useContext, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Styled from 'styled-components/native';
import ChurchCard from '~/Components/ChurchCard';

const CardsColViewBox = Styled.View`
  /* background-color: blue; */
  /* margin: 0px 10px 0px 10px; //╩С ©Л го аб */
  justify-content: center;
  align-items: center;
`;

const FlatListItemSeparator = () => {
    return(<View style={{height: 20, width: '100%', backgroundColor: 'yellow'}}/>)
}

const ChurchCardsColView = ({route, navigation}) => {

    let title = route.params.title;
    let fetchChurch = route.params.fetchChurch;
    const [churches, setChurches] = useState([]);
    navigation.setOptions({title: title});

    useEffect(() => {
        fetchChurch();
    }, [fetchChurch]);

    return (
        <CardsColViewBox>
            {FlatListItemSeparator}
            <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{width: '100%', alignItems: 'center'}}
                data={churches}
                keyExtractor={(item, index) => {
                    return `myData-${index}`;
                }}
                renderItem={({ item, index }) => (
                        <ChurchCard church={item} navigation={navigation}/>
                )}
                ItemSeparatorComponent={FlatListItemSeparator}
            />
        </CardsColViewBox>
    )
};

export default ChurchCardsColView;