import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from './Details.css';

export const Details = props =>
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>{`Details Screen ${props.navigation.state.params.item.date}`}</Text>
    <Button
      title={props.navigation.state.params.item.title}
      onPress={() => props.navigation.navigate('Home')}
    />
  </View>;

Details.navigationOptions = ({navigation}) => ({
  title: navigation.state.params.item.title
});