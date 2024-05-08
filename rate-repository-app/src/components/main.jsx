import { View } from "react-native";
import RepositoryList from './repositoryList';
import { StatusBar } from "expo-status-bar";
import AppBar from "./AppBar";


const Main = () => {
    return (
        <View>
            <AppBar />
            <RepositoryList />
            <StatusBar style="light"/>
        </View>
    )
};

export default Main;