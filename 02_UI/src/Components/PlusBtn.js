import {Text} from 'react-native';
import Styled from 'styled-components/native';
import Styles from '~/Style';

const PlusBtnBox = Styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    background-color: transparent;
    margin: 10px 0px 10px 0px; //╩С ©Л го аб
`;

const PlusBtnView = Styled.View`
    width: 100%;
`;


const PlusText = Styled.Text`
    color: white;
    background-color: skyblue;
    width: 70px;
    height: 50px;
    font-size: 50px;
    font-family: 'DoHyeon-Regular';
    padding: 5px;
    text-align: center;
    border-radius: 10px;
    margin 10px 0px 10px 0px; //╩С ©Л го аб
`;

const PlusBtn = ({text}) => {
    return (
        <PlusBtnBox>
            <PlusText>+</PlusText>
            <Text style={Styles.default}>{text}</Text>
        </PlusBtnBox>
    )
}

export default PlusBtn;