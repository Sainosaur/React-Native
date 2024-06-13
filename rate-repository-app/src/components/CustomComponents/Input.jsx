import { TextInput as NativeInput, StyleSheet, Text } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    textinput:{
        padding: 15,
        fontFamily: theme.font.fontFamily,
        fontSize: 15,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: "white"
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
    const styles = StyleSheet.create({
        button: {
            display: "flex",
            fontFamily: theme.font.fontFamily,
            textAlign: "center",
            fontSize: props.fontSize ? props.fontSize : 20,
            backgroundColor: props.color ? props.color : theme.colors.primary,
            color: theme.colors.fg,
            fontWeight: "500",
            padding: 15,
            borderRadius: 20,
            overflow: "hidden"
    
        }
    })
    return <Text style={styles.button} {...props} ></Text>
}