import React from "react";
import { View, Text } from 'react-native';


const CharacterCountLimit = ({curLength, maxLength}) => {

    return <View style={{flexDirection:'row-reverse', marginLeft: 10}}><Text style={{color: 'gray', backgroundColor: 'transparent'}}>{curLength} / {maxLength}</Text></View>
};

export default CharacterCountLimit;