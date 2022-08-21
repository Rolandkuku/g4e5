/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {ArticleList} from './src/Screens/ArticleList';
import {ArticleDetails} from './src/Screens/ArticleDetails';

type HTMLContent = {
  rendered?: string;
};

export interface Article {
  id: number;
  content?: HTMLContent;
  title?: HTMLContent;
}

export type RootStackParamList = {
  ArticleList: undefined;
  ArticleDetails: {articleId: number};
};

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [artciles, setArticles] = useState<Article[]>([]);
  return (
    <NavigationContainer>
      <Navigator initialRouteName="ArticleList">
        <Screen component={ArticleList} name="ArticleList" />
        <Screen component={ArticleDetails} name="ArticleDetails" />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
