import React, {useState, createContext} from 'react';
import { useContext } from 'react/cjs/react.development';
import { View, Text, Image } from 'react-native';
import Styled from 'styled-components/native';

const Input = Styled.TextInput`
background-color: yellow;
width: 60%;
border-bottom-width: 3px;
`;

const SearchBtn = Styled.TouchableOpacity`
background-color: green;
width: 20%;
border-bottom-width: 3px;
`;

//맵 데이터 -- 전역으로 쓸 필요가 있을까
const MapData = createContext({
    mapData : {
        // longitude,
        // latitude,
    },
    
    setMapData : (value) => {
        // longitude = 0;
        // latitude = 0;
    },
});


const UserContextProvider = ({children}) => {
    const [mapData, setMapData] = useState(null);

    return (
        <MapData.Provider value = {{mapData, setMapData}}>
            {children}
        </MapData.Provider>
    )
}

const SearchLocate = ()=>{
    return (
        <>
            {
                <View>
                    <Input
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder={"장소찾기!"}
                        returnKeyType="done"
                        onChangeText={console.log("hello hello~~~~~")}
                        value={"산본동"}
                    />

                    <SearchBtn onPress={
                        () => {console.log("search!!!")}
                        }>
                        <Text> Search Locate </Text>
                    </SearchBtn>
                </View>
            }
        </>
    )
}


export {MapData, UserContextProvider};
export default SearchLocate;