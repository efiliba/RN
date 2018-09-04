import React from 'react';
import {View, Image, Text} from 'react-native';
import {styles} from './Tile.css';

export const Tile = ({img, title, date}) =>
  <View style={styles.container}>
    <Image style={styles.image} source={img} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.date}>{date}</Text>
  </View>;
