import React from 'react';
import { ImageSourcePropType } from 'react-native';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity`
  flex: 1;
  border-bottom-width: 3px;
  border-color: #929292;
  padding-bottom: 8px;
  align-items: center;
  justify-content: center;  
  padding: 10px 0px 5px 0px; //상 우 하 좌
`;
const Label = Styled.Text`
  font-size: 20px;
  color: #929292;
  text-align: center;  
  font-family: 'DoHyeon-Regular';
`;
const TabImage = Styled.Image`
  margin-top: 8px;
`;

const Tab = ({ selected, label, imageSource, onPress }) => {
    let color = selected ? '#292929' : '#929292';
  
    return (
      <Container
        activeOpacity={1}
        style={{ borderColor: color }}
        onPress={onPress}>
        {label && <Label style={{ color: color }}>{label}</Label>}
        {imageSource && <TabImage source={imageSource} />}
      </Container>
    );
  };
  
  export default Tab;
  