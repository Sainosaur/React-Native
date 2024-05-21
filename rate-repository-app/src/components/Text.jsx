import { Text as NativeText, StyleSheet } from "react-native"
import theme from './theme'

const Text = ({ light, heading, chip, center, ...props}) => {
    const styles = StyleSheet.create({
        text: {
            textAlign: center ? "center" : null,
            fontSize: heading ? 25 : 15,
            fontStyle: heading ? "italic" : "normal",
            fontWeight: heading ? "700" : "300",
            color: light ? theme.colors.light : theme.colors.primary,
            paddingRight: !center ? 70 : null,
          }, chip: {
            display: "flex",
            width: 90,
            backgroundColor: theme.colors.primary,
            color: "white",
            borderRadius: 5,
            padding: 5,
          }
    })
    return <NativeText style={chip ? styles.chip : styles.text} {...props} />;
}

export default Text