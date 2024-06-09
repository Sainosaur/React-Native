import { StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native"

import { useQuery } from "@apollo/client"
import useAuthStorage from "../hooks/useAuthStorage"
import { useApolloClient } from "@apollo/client"

import { ME } from "../graphql/queries"

import Text from './CustomComponents/Text'
import theme from "./theme"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    fontFamily: theme.font.fontFamily,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    height: Platform.select({
      android: 110,
      ios: 130
    }),
  }, text: {
    fontFamily: theme.font.fontFamily,
    color: theme.colors.fg,
    fontWeight: "bold" ,
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

const SignOutTab = () => {
  const authStorage = useAuthStorage()
  const ApolloClient = useApolloClient()

  const signOut = () => {
    authStorage.removeAccessToken()
    ApolloClient.resetStore()

  }

  return (
    <Pressable>
      <Text onPress={() => signOut()} style={styles.text}>Sign Out</Text>
    </Pressable>
  )
}

const AppBar = () => {
  const { data } = useQuery(ME)
  if (data) {
  return (
    <ScrollView style={styles.container} horizontal>
      {data.me ? <SignOutTab /> : <AppBarTab name="Sign In" address="/signin" />}
      {data.me ? null : <AppBarTab name="Sign Up" address="/signup" />}
      <AppBarTab name="Repositories" address="/"/>
      {data.me ? <AppBarTab name="Review" address="/create" /> : null}
    </ScrollView>
    )
  } else {
    return (
      <Text>Loading User Data...</Text>
    )
  }

};

export default AppBar;