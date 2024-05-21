import { useFormik } from "formik"
import { View, StyleSheet, Pressable } from 'react-native'
import { TextInput, Button } from "./Input"
import Text from "./Text";

const initialValues = {
    username: "",
    password: ""
}

const styles = StyleSheet.create({
    form: {
        display:"flex",
        backgroundColor: "white",
        padding: 15,
        paddingBottom: "150%"
    }, seperator: {
        height: 10
    }, largeSeperator: {
        height: 200
    }
})

const Seperator = () => {
    return <View style={styles.seperator} />
}

const LargeSeperator = () => {
    return <View style={styles.largeSeperator} />
}


const SignIn = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => console.log(values.username, values.password)
    })

    return (
        <View style={styles.form}>
            <Text heading center>Sign In</Text>
            <LargeSeperator />
            <TextInput value={formik.values.username} placeholder="Username" onChangeText={formik.handleChange("username")} />
            <Seperator />
            <TextInput secureTextEntry value={formik.values.password} placeholder="Password" onChangeText={formik.handleChange("password")}/>
            <Seperator />
            <Pressable>
                <Button chip onPress={() => formik.handleSubmit()}>Sign In</Button>
            </Pressable>
        </View>
    )
}

export default SignIn