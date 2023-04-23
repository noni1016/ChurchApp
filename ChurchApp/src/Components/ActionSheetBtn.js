import React from 'react';
import { View, Text, Dimensions} from 'react-native';
import Styled from 'styled-components/native';


const Container = Styled.View`
    border-color: grey;
    border-bottom-width: 1px;
`;


const TouchObj = Styled.TouchableOpacity`
    width: ${Dimensions.get('window').width}px;
    height: 50px;
    font-size: 30px;
    font-weight: bold;
    color: black;
    justify-content: center;
    align-items: center;
`;


const ActionSheetBtn = ({children, OnPressMethod}) => {
    return (
        <Container>
            <TouchObj onPress={OnPressMethod} >
                <Text color='black'>{children}</Text>
            </TouchObj>
        </Container>
    )
}

export default ActionSheetBtn;