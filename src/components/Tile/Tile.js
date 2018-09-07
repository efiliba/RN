import React from 'react';
import {View, Image, Text} from 'react-native';
import {styles} from './Tile.css';

export const Tile = props => {
  const {ThumbImageUrl: uri, Title: title, EffectiveFrom: date} = props;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri}} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

// ArticlePreviewUrl: "https://test.creditsavvy.com.au:443/learn/article-by-id/6015"
// FeatureImageUrl: "https://testsavvystorage.blob.core.windows.net/cms/2018/04/5-questions-about-credit-scores-you-were-too-embarrassed-to-ask-700x327.jpg"
// Slug: "5-questions-about-credit-scores-you-were-too-embarrassed-to-ask"
// ThumbImageUrl: "https://testsavvystorage.blob.core.windows.net/cms/2018/04/5-questions-about-credit-scores-you-were-too-embarrassed-to-ask-350x210.jpg"
// Synopsis: "<p>The finer details of Australia’s credit reporting system may not be everyone’s cup of tea, so we’re here to answer a few questions you might not have gotten around to asking (or felt comfortable enough to!). Here are 5 questions about credit scores you were to embarrassed to ask.</p>"

