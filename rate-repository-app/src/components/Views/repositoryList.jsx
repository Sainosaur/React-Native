import { FlatList, View, StyleSheet, Image, Pressable, Modal, Platform } from 'react-native';
import theme from '../theme'
import Text from "../CustomComponents/Text"
import { Button } from "../CustomComponents/Input"
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from "react-native-paper"

import * as React from "react"

import useRepositories from '../../hooks/useRepositories'
import { useNavigate } from "react-router-native"
import { useState } from "react"
import { useDebounce } from "use-debounce"

import * as Linking from "expo-linking"

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
  }, largeSeparator: {
    height: 25
  }, modal: {
    width: 25,
    height: 70
  }, searchBar: {
    backgroundColor: theme.colors.fg,
    height: 70,
    borderRadius: 0
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

export const RepositoryItem = ({item, github}) => {
  const navigate = useNavigate()
    return (
      <Pressable onPress={github ? null : () => navigate(`/repositories/${item.id}`)} >
          <View style={styles.card} testID="RepositoryItem">
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
            <ItemSeparator />
            {github ? <Pressable onPress={() => Linking.openURL(item.url)}><Button chip >View on Github</Button></Pressable> : null}
        </View>
      </Pressable>

    )
}

const labels = {
  LatestRepo: "Latest Repositories",
  HighRepo: "Highest Rated Repositories",
  LowRepo: "Lowest Rated Repositories"
}

const Header = ({ sortMethod, setSortMethod }) => {
  return (
    <Picker
    selectedValue={sortMethod}
    onValueChange={(value) => setSortMethod(value)}
    >
      <Picker.Item label={labels.LatestRepo} value="LatestRepo" />
      <Picker.Item label={labels.HighRepo} value="HighRepo"/>
      <Picker.Item label={labels.LowRepo} value="LowRepo" />
    </Picker>
  )
}

const AndroidHeader = ({ sortMethod, setSortMethod, search, setSearch }) => {
  return (
    <View>
      <SearchBar search={search} setSearch={setSearch} />
      <Header sortMethod={sortMethod} setSortMethod={setSortMethod} />
    </View>
  )
}

const IOSHeader = ({ sortMethod, setSortMethod, search, setSearch }) => {
  const [open, setOpen] = useState(false)

  return (
    <View>
      <SearchBar search={search} setSearch={setSearch} />
      <Text style={styles.card} onPress={() => setOpen(true)}>
        Sort By: {labels[sortMethod]}
      </Text>
      <ItemSeparator />
      <Modal
      animationType="slide"
      visible={open}
      presentationStyle="formSheet"
      onRequestClose={() => setOpen(false)}
      >
        <View style={styles.card}>
          <Text heading>Sort By:</Text>
        </View>
        <Header sortMethod={sortMethod} setSortMethod={setSortMethod} />
      </Modal>
    </View>

  )
}

const SearchBar = ({search, setSearch}) => {
  return (
    <View style={styles.seachBarContainer}>
      <Searchbar elevation="3" style={styles.searchBar} value={search} onChangeText={(value) => setSearch(value)} />
    </View>
  )
}

class RenderRepositoryList extends React.Component  { 
  renderHeader = () => {
    const props = this.props

    return (
      Platform.select({
      android: <AndroidHeader sortMethod={props.sortMethod} setSortMethod={props.setSortMethod} search={props.search} setSearch={props.setSearch} />,
      ios: <IOSHeader sortMethod={props.sortMethod} setSortMethod={props.setSortMethod} search={props.search} setSearch={props.setSearch} />
    })
    )
  }
  render() {
    const props = this.props
    const renderData = props.repositories ? props.repositories.edges.map((edge) => edge.node) : null
    if (renderData) {
      return (
          <FlatList
          data={renderData}
          ListHeaderComponent={this.renderHeader}
          ListEmptyComponent= {
            <View>
            <Text>Repository Not found...</Text>
          </View>
          }
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={() => <View style={styles.largeSeparator} />}
          renderItem={({item}) => <RepositoryItem item={item}/>}
        />
      );
    }
  }
}

const RepositoryList = () => {
  const [ sortMethod, setSortMethod ] = useState("LatestRepo")
  const [ search, setSearch ] = useState("")
  const [ searchValue ] = useDebounce(search, 500)

  const { repositories } = useRepositories(sortMethod, searchValue)

  return (
    <RenderRepositoryList repositories={ repositories } sortMethod={sortMethod} setSortMethod={setSortMethod} search={search} setSearch={setSearch} />
  )
}


export default RepositoryList;