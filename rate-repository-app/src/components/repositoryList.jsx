import { FlatList, View, StyleSheet, Image } from 'react-native';
import theme from './theme'
import Text from "./CustomComponents/Text"
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },logo: {
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
    paddingLeft: 50,
    justifyContent: "space-evenly",
    justifySelf: "center"
  }, info: {
    paddingLeft: 20
  }
});

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
  const { repositories } = useRepositories()
  const renderData = repositories ? repositories.edges.map((edge) => edge.node) : null
  if (renderData) {
    return (
      <FlatList
        data={renderData}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryItem item={item}/>}
      />
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
};

export default RepositoryList;