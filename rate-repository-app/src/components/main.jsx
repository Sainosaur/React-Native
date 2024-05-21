import { View, StyleSheet } from "react-native";
import RepositoryList from './repositoryList';
import { StatusBar } from "expo-status-bar";


import AppBar from "./AppBar";
import theme from "./theme"
import SignIn from './SignIn'

import { Routes, Route, Navigate } from 'react-router-native';

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
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <StatusBar style="light"/>
        </View>
    )
};

export default Main;