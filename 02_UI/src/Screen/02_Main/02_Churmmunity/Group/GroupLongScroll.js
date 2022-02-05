import React, {useState, useEffect, useContext} from 'react';
import { FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';
import {DataContext} from '~/Context/Data';
import GroupCard from '~/Components/GroupCard';

const LongScrollContainer = styled.View`
  background-color: #FFFFFF;
  margin: 0px 10px 0px 10px; //상 우 하 좌
  justify-content: center;
  align-items: center;
`;

const GroupLongScroll = () => {

    const {myGroupDatas, recGroups, showMoreMode} = useContext(DataContext);

    return (
        // <Text>{myGroupDatas[0].name}</Text>
        <LongScrollContainer>
            {(showMoreMode === 0) && 
            <FlatList
                data={myGroupDatas}
                keyExtractor={(item, index) => {
                    return `myData-${index}`;
                }}
                renderItem={({ item, index }) => (
                    <GroupCard data={item}></GroupCard>
                )}
            />}
            {(showMoreMode === 2) &&
            <FlatList
                data={recGroups}
                keyExtractor={(item, index) => {
                    return `myData-${index}`;
                }}
                renderItem={({ item, index }) => (
                    <GroupCard data={item}></GroupCard>
                )}
            />}
        </LongScrollContainer>
    )
};

export default GroupLongScroll;