import React from 'react';
import {connect} from 'react-redux';
import { Platform, View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { styles, navigationOptions } from './App.css';
import { SelectableItems, Tile, Details, Heading } from './src/components';
import { ContentApi } from "./src/Services/Data/Api/Content/ContentApi";

const MAX_CREDIT_SCORE_ARTICLES = 7;

const platform = Platform.select({
    ios: 'Running on IOS',
    android: 'Running on Android'
});


class HomeComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleNavigateTo = this.handleNavigateTo.bind(this);
    }

    componentWillMount() {
        this.props.loadCreditScoreArticles();
    }

    handleNavigateTo(item) {
        this.props.navigation.navigate('Details', {item});
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>{platform}</Text>
                <SelectableItems
                    Heading={Heading}
                    stateProperty={this.props.creditScoreArticles}
                    onItemSelected={this.handleNavigateTo}
                >
                    <Tile />
                </SelectableItems>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    creditScoreArticles: state.content.creditScoreArticles
});

const mapDispatchToProps = () => {                                  // dispatch used internally
    const api = new ContentApi();

    // https://test.creditsavvy.com.au/api/article/GetArticlesByTag?tagSlug=curated-learn-lead-carousel

    // const slug = "curated-learn-lead-carousel";
    // api.getArticlesByTag(slug, () => console.log("callback"));

    return {
        loadCreditScoreArticles: () => api.getCreditScoreArticles(MAX_CREDIT_SCORE_ARTICLES)
    };
};

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

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
