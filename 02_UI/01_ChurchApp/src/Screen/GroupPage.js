import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, Dimensions, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';
import {DomainContext} from '~/Context/Domain';
import Tab from '~/Components/Tab';
import GroupPageHome from '~/Components/GroupPageHome';

const Header = styled.View`
    //height: 15%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0px 5px 10px; //상 우 하 좌
    background-color: #FFFFFF;
`;

const Title = styled.Text`
    height: 30px;
    color: black;
    font-size: 27px;
    font-family: 'DoHyeon-Regular';
`;

const TabContainer = styled.SafeAreaView`
  flex-direction: row;
  background-color: skyblue;
`;

const GroupPage = ({route}) => {
    const domain = useContext(DomainContext);
    const data = route.params.groupData;
    const [tabIndex, setTabIndex] = useState(0);
    var [imgWidth, setImgWidth] = useState();
    var [imgHeight, setImgHeight] = useState();    
    var [resizedWidth, setResizedWidth] = useState(100);
    var [resizedHeight, setResizedHeight] = useState(100);
    var [url, setUrl] = useState('');
    var tabs = ['홈', '게시글', '사진'];
    
    useEffect(() => {
        setUrl(`${domain}/${data.mainImg}`);
        Image.getSize(url, (width, height) => {
            setImgWidth(width);
            setImgHeight(height);
            if(width > Dimensions.get('window').width) {
                setResizedWidth(Dimensions.get('window').width);
                setResizedHeight(Dimensions.get('window').width / width * height);
            } else {
                setResizedWidth(width);
                setResizedHeight(height);
            }
        })
    });


    return (
        <View>
            <Header>
                <Title>
                    {data.name}
                </Title>
            </Header>
            <ScrollView>
                <Image style={{ backgroundColor: '#000000', width: resizedWidth, height: resizedHeight, resizeMode: 'contain' }} source={{ uri: url }} />
                {/* Sub navigation. 실제 네비게이션은 아니지만 버튼 선택을 통해 네비처럼 동작하도록 구현 */}
                <TabContainer>
                    {tabs.map((label, index) => (
                        <Tab
                            key={`tab-${index}`}
                            selected={tabIndex === index}
                            label={label}
                            onPress={() => {
                                setTabIndex(index);
                            }}
                        />
                    ))}
                </TabContainer>
                {tabIndex == 0 && <GroupPageHome data={data}/>}
                {tabIndex == 1 && <Text>게시글</Text>}
                {tabIndex == 2 && <Text>사진</Text>}
            </ScrollView>
        </View>
    )
};

export default GroupPage;