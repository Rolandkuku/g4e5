import {TypedNavigator} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Article, RootStackParamList} from '../../App';

function useArticles() {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);
        const resp = await fetch(
          'https://www.girondins4ever.com/wp-json/wp/v2/breves?per_page=5&page=1&offset=5',
        );
        const parsed = await resp.json();
        console.log(parsed);
        setArticles(parsed);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);
  return {loading, articles};
}

type Props = NativeStackScreenProps<RootStackParamList, 'ArticleList'>;

export const ArticleList: FC<Props> = ({navigation}) => {
  const {loading, articles} = useArticles();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>{loading ? <Text>loading</Text> : null}</View>
        {articles?.map(a => (
          <Pressable
            key={a.id}
            onPress={() =>
              navigation.navigate('ArticleDetails', {articleId: a.id})
            }>
            <View>
              <Text>{a.title?.rendered}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
