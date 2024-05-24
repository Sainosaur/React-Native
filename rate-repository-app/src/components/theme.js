import { Platform } from "react-native"

const theme = {
    font: {
        fontFamily: Platform.select({
            android: "Roboto",
            ios: "Arial",
            default: "System"
          }),
    },

    colors: {
        bg: "#d9dede",
        primary: Platform.select({
            android: "green",
            ios: "teal",
            default: '#0000000'
        }),
        light: "#A09985",
        fg: "#ffffff"
    }, card: {
        backgroundColor:"#ffffff",
        display: "flex",
        flexDirection: "column",
        borderRadius: 30,
        padding: 15
    }
}

export default theme;