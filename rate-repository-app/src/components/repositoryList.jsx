import { FlatList, View, StyleSheet, Image } from 'react-native';
import theme from './theme'
import Text from "./Text"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  logo: {
    display: "flex",
    width: 90,
    height: 90,
    borderRadius: 5,
    alignItems: "flex-start",
    paddingRight: 20
  }, card: {
    ...theme.card
  }, content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  }, stat: {
    display: "flex",
    alignItems:"center",
    flexDirection: "column",
  }, statContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }, info: {
    paddingLeft: 20
  }
});

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const RenderStat = ({text, number}) => {
    return (
        <View style={styles.stat}>
            <Text heading> {number > 1000 ? Math.round(number / 100) / 10 + "K" : number}</Text>
            <Text light>{text}</Text>
        </View>
    )
}

const RepositoryItem = ({item}) => {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <Image style={styles.logo} source={{uri: item.ownerAvatarUrl}} />
                    <View style={styles.info} >
                        <Text heading>{item.fullName}</Text>
                        <Text light>{item.description}</Text>
                        <Text chip>{item.language}</Text>
                    </View>
            </View>
            <View style={styles.statContent}>
                <RenderStat text="Stars" number={item.stargazersCount}/>
                <RenderStat text="Forks" number={item.forksCount} />
                <RenderStat text="Reviews" number={item.reviewCount} />
                <RenderStat text="Rating" number={item.ratingAverage} />
            </View>
        </View>
    )
}

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem item={item}/>}
    />
  );
};

export default RepositoryList;