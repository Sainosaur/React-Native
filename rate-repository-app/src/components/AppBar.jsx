import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from "./theme"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bg,
    height: 100,
  }, text: {
    color: theme.colors.fg,
    paddingTop: 30,
    fontSize: 20
  }
});

const AppBarTab = ({name}) => {
    return (
        <Pressable>
            <Text onPress={() => console.log("Tapped!")} style={styles.text}>{name}</Text>
        </Pressable>
    )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
        <AppBarTab name="Repositories"/>
    </View>
  )
};

export default AppBar;