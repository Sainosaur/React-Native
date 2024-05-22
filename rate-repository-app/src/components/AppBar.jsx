import { StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native"

import Text from './Text'
import theme from "./theme"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    height: 100,
  }, text: {
    color: theme.colors.fg,
    paddingTop: 30,
    paddingLeft: 10,
    fontSize: 20
  }
});

const AppBarTab = ({name, address}) => {
    return (
        <Pressable>
          <Link to={address}>
            <Text style={styles.text}>{name}</Text>
          </Link>
        </Pressable>
    )
}

const AppBar = () => {
  return (
      <ScrollView style={styles.container} horizontal>
        <AppBarTab name="Sign In" address="/signin" />
        <AppBarTab name="Repositories" address="/"/>
      </ScrollView>
  )
};

export default AppBar;