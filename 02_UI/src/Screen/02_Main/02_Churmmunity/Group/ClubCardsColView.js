import React from 'react';
import { FlatList } from 'react-native';
import Styled from 'styled-components/native';
import ClubCard from '~/Components/ClubCard';

const ClubCardsColViewBox = Styled.View`
  background-color: #FFFFFF;
  margin: 0px 10px 0px 10px; //상 우 하 좌
  justify-content: center;
  align-items: center;
`;

const ClubCardsColView = ({route, navigation}) => {

    let clubs = route.params.clubs;

    return (
        <ClubCardsColViewBox>
            <FlatList
                data={clubs}
                keyExtractor={(item, index) => {
                    return `myData-${index}`;
                }}
                renderItem={({ item, index }) => (
                    <ClubCard data={item}></ClubCard>
                )}
            />
        </ClubCardsColViewBox>
    )
};

export default ClubCardsColView;