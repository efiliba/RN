import React from 'react';
import {ScrollView, TouchableHighlight} from 'react-native';
import {styles} from './SelectableItems.css';

export const SelectableItems = ({items, itemKey, onItemSelected, Heading, component, children}) =>
  <ScrollView style={styles.container}>
    <Heading />
    {items.map((item, index) =>
      <TouchableHighlight key={item[itemKey] || index} onPress={() => onItemSelected(item)}>
      {
        React.cloneElement(component || children, item)
      }
      </TouchableHighlight>
    )}
  </ScrollView>;
