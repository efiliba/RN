import React from 'react';
import { Platform, View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { styles, navigationOptions } from './App.css';
import { SelectableItems, Tile, Details, Heading } from './src/components';

const platform = Platform.select({
    ios: 'Running on IOS',
    android: 'Running on Android'
});

const data = [{
    img: require("./src/img/image1.jpeg"),
    title: "Credit score 101 for uni students",
    date: "14 August 2018"
}, {
    img: require("./src/img/image2.png"),
    title: "Not so obvious reasons to monitor your credit score",
    date: "08 August 2018"
}, {
    img: require("./src/img/image3.jpeg"),
    title: "What are Bad Credit Car Loans?",
    date: "19 July 2018"
}, {
    img: require("./src/img/image4.png"),
    title: "What you should know about mobile phone plans",
    date: "13 July 2018"
}];

const handleNavigateTo = navigation => item => {
    navigation.navigate('Details', {item});
};

const HomeScreen = ({navigation}) =>
    <View style={styles.container}>
        <Text style={styles.welcome}>React Native! 4</Text>
        <Text style={styles.instructions}>{platform}</Text>
        <SelectableItems items={data} onItemSelected={handleNavigateTo(navigation)} Heading={Heading}>
            <Tile />
        </SelectableItems>
    </View>;

HomeScreen.navigationOptions = ({navigation}) => ({
    title: 'Home',
    // title: navigation.getParam('otherParam', 'A Nested Details Screen'),
});

export default createStackNavigator({
    Home: HomeScreen,
    Details
}, {
    initialRouteName: 'Home',
    navigationOptions
});
