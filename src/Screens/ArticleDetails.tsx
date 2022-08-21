import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useEffect, useState} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {Article, RootStackParamList} from '../../App';
import AutoHeightWebView from 'react-native-autoheight-webview';

function useArticle(articleId: number) {
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<Article>();
  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          `https://www.girondins4ever.com/wp-json/wp/v2/breves/${articleId}`,
        );
        const parsed = await resp.json();
        setArticle(parsed);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, [articleId]);
  return {loading, article};
}

type Props = NativeStackScreenProps<RootStackParamList, 'ArticleDetails'>;

export const ArticleDetails: FC<Props> = ({route}) => {
  const articleId = route.params.articleId;
  const {loading, article} = useArticle(articleId);
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{article?.title?.rendered}</Text>
        <View>
          {loading ? <Text>loading...</Text> : null}
          {article ? (
            <AutoHeightWebView
              style={{
                width: Dimensions.get('window').width - 15,
                marginTop: 35,
              }}
              originWhitelist={['*']}
              source={{html: article.content?.rendered || 'No content'}}
            />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
