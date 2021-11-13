import React from 'react';
import { View, Text, Dimensions, ScrollView, Image} from 'react-native';
import Styled from 'styled-components/native';

const Container = Styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const GroupNameBox = Styled.View`
    flex: 
`;

const EditFeed = ({route, navigation}) => {
    const data = route.params.groupData;

    return (
        <Container>
            <Text>{data.name}</Text>
            <Text>{data.name}</Text>
        </Container>
    )
}

export default EditFeed;