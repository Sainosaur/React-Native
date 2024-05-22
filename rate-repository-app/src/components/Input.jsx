import { TextInput as NativeInput, StyleSheet, Text } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
    textinput:{
        padding: 15,
        fontSize: 15,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: "white"
    }, button: {
        display: "flex",
        textAlign: "center",
        fontSize: 20,
        backgroundColor: theme.colors.primary,
        color: theme.colors.fg,
        fontWeight: "500",
        padding: 15,
        borderRadius: 15

    }
})

export const TextInput = (props) => {   
    const InputStyle = {
        ...styles.textinput,
        borderColor: props.error ? "red" : "gray"
    }
    return <NativeInput style={InputStyle}  {...props} />
}

export const Button = (props) => {
    return <Text style={styles.button} {...props} ></Text>
}