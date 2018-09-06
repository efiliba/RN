import React from 'react';
import {ScrollView, TouchableHighlight} from 'react-native';
import {styles} from './SelectableItems.css';

export const SelectableItems = ({stateProperty, itemKey, onItemSelected, Heading, component, children}) => {
  // const status = LoadingAnimation.getStatus(stateProperty, LoadingAnimation.Size.Large);

  // if (status.loadingAnimation)
  //     return status.loadingAnimation;

  const items = stateProperty && stateProperty.data;

  if (!items) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Heading />
      {items.map((item, index) =>
        <TouchableHighlight key={item[itemKey] || index} onPress={() => onItemSelected(item)}>
        {
          React.cloneElement(component || children, item)
        }
        </TouchableHighlight>
      )}
    </ScrollView>
  );
};
