import { View, StyleSheet } from "react-native";
import RepositoryList from './repositoryList';
import { StatusBar } from "expo-status-bar";
import AppBar from "./AppBar";
import theme from "./theme"

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: theme.colors.bg,
        paddingBottom: 100
    }
})


const Main = () => {
    return (
        <View style={styles.mainView}>
            <AppBar />
            <RepositoryList />
            <StatusBar style="light"/>
        </View>
    )
};

export default Main;