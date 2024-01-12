import React from 'react';
import styled from "styled-components/native";

const RectangleBtnBox = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px;
`; 

const TouchObj = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    color: white;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const BtnText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 18px;
    font-family: 'DoHyeon-Regular';   
`;

const RectangleBtn = ({color, text, onPress}) => {
    return (
        <RectangleBtnBox style={{backgroundColor: color}}>
            <TouchObj onPress={onPress}>
                <BtnText>
                    {text}
                </BtnText>
            </TouchObj>
        </RectangleBtnBox>
    );
};

export default RectangleBtn;