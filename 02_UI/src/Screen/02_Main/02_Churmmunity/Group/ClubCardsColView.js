import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Styled from 'styled-components/native';
import ClubCard from '~/Components/ClubCard';

const ClubCardsColViewBox = Styled.View`
  background-color: #FFFFFF;
  /* margin: 0px 10px 0px 10px; //상 우 하 좌 */
  justify-content: center;
  align-items: center;
`;

const FlatListItemSeparator = () => {
    return(<View style={{height: 20, width: '100%', backgroundColor: 'yellow'}}/>)
}

const ClubCardsColView = ({route, navigation}) => {

    let title = route.params.title;
    let clubs = route.params.clubs;
    navigation.setOptions({title: title});

    // useEffect(() => {
    //     navigation.setOptions({title: title});
    // },[]);

    return (
        <ClubCardsColViewBox>
            {FlatListItemSeparator}
            <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{width: '100%', alignItems: 'center'}}
                data={clubs}
                keyExtractor={(item, index) => {
                    return `myData-${index}`;
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress = {() => {
                        navigation.navigate('ClubPage', {club : item, navigation: navigation});
                    }}>
                        <ClubCard club={item}></ClubCard>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={FlatListItemSeparator}
            />
        </ClubCardsColViewBox>
    )
};

export default ClubCardsColView;