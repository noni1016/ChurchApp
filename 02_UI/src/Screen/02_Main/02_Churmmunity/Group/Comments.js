import React, { useState, useEffect } from 'react';
import {View,Text, FlatList, SafeAreaView} from 'react-native';
import Comment from '~/Components/Comments';


const RenderItem = ({item}) => {
  useEffect(() => {    
    console.log(`item: ${item.text}`);
  })
  return (
    <Text fontSize={30}>{item.text}</Text>
  )
}

const Comments = ({route, navigation}) => {

  const [comments, setComments] = useState([]);
  // const comments = route.params.comments;

  useEffect(() => {
    setComments(route.params.comments);
  })

    return (
      // <Text>Comments</Text>
      <SafeAreaView>
          {comments.map((data, i) => (
            <Comment data={data} navigation={navigation} key={i} />
          ))}        
      </SafeAreaView>
    );
  
}
  
export default Comments;
  