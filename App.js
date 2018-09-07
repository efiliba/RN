import React from 'react';
import {connect} from 'react-redux';
import {Platform, View, Text, Button} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {styles, navigationOptions} from './App.css';
import {SelectableItems, Tile, Details, Heading} from './src/components';
import {ContentApi} from './src/Services/Data/Api/Content/ContentApi';
import RNFirebase from 'react-native-firebase';

const MAX_CREDIT_SCORE_ARTICLES = 7;

const firebaseConfig = {
  // debug: true,
  // promptOnMissingPlayServices: true,
  apiKey: "AIzaSyD4zTgP0YEX2oVk7FxX2K4iVqZAQavA5aM",
  authDomain: "simply-notify-c05df.firebaseapp.com",
  databaseURL: "https://simply-notify-c05df.firebaseio.com",
  projectId: "simply-notify-c05df",
  storageBucket: "simply-notify-c05df.appspot.com",
  messagingSenderId: "964652296440"
};

// firebase.initializeApp(firebaseConfig);
const firebase = RNFirebase.initializeApp(firebaseConfig);

const tokensDbTable = firebase.database().ref("/tokens");
const messaging = firebase.messaging();





// firebase.messaging().onTokenRefresh(token => {
//   onChangeToken(token);
// });

const platform = Platform.select({
  ios: 'Running on IOS',
  android: 'Running on Android'
});

class HomeComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleNavigateTo = this.handleNavigateTo.bind(this);
    this.handleTestPush = this.handleTestPush.bind(this);
  }

  componentWillMount() {
    this.props.loadCreditScoreArticles();
  }

  componentDidMount() {
    this.messageListener = messaging.onMessage(message => {
      debugger;
      console.log(message);
    });
  }

  componentWillUnmount() {
    this.messageListener();
  }

  handleNavigateTo(item) {
    this.props.navigation.navigate('Details', {item});
  };

  async handleTestPush() {
    try {
      const enabled = await messaging.hasPermission();
      console.log(enabled);

      // await messaging.requestPermission();

      const token = await messaging.getToken();
      console.log(token);
debugger;
      return await tokensDbTable.push({                             // Save token on application server
        token,
        uid: "anon"
      });
    } catch(error) {
      debugger;
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Test Push" onPress={this.handleTestPush} />
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
