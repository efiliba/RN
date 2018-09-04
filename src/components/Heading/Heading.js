import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from './Heading.css';

export const Heading = props =>
  <View style={styles.container}>
    <Text style={styles.left}>{'Credit\nScore'}</Text>
    <Text style={styles.right}>{'View All Credit Score\nArticles'}</Text>
    {/* <Button
      title={props.navigation.state.params.item.title}
      onPress={() => props.navigation.navigate('Home')}
    /> */}
  </View>;
