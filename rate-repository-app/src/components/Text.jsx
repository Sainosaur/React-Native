import { Text as NativeText, StyleSheet} from "react-native"
import theme from './theme'

const Text = ({ light, heading, chip, center, error, ...props}) => {
    const styles = StyleSheet.create({
        text: {
            textAlign: center ? "center" : null,
            fontFamily: theme.font.fontFamily,
            fontSize: heading ? 25 : 15,
            fontStyle: heading ? "italic" : "normal",
            fontWeight: heading ? "700" : "300",
            color: light ? theme.colors.light : theme.colors.primary,
            paddingRight: !center ? 70 : null,
          }, chip: {
            display: "flex",
            fontFamily: theme.font.fontFamily,
            width: 90,
            backgroundColor: theme.colors.primary,
            color: "white",
            borderRadius: 5,
            padding: 5,
          }, error: {
            fontFamily: theme.font.fontFamily,
            fontWeight: "500",
            color: "red"
          }
    })
    let Style;
    if (chip) {
      Style = styles.chip
    } else if (error) {
      Style = styles.error
    } else {
      Style = styles.text
    }
    return <NativeText style={Style} {...props} />;
}

export default Text