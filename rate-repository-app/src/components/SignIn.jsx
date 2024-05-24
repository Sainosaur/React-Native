import { useFormik } from "formik"
import { View, StyleSheet, Pressable } from 'react-native'
import { TextInput, Button } from "./CustomComponents/Input"
import Text from "./CustomComponents/Text";
import * as yup from "yup";

const validationSchema = yup.object({
    username: yup
        .string()
        .required("Username is required"),
    password: yup
        .string()
        .required("Password is required")
})

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
        height: 5
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
        validationSchema,
        onSubmit: (values) => console.log(values.username, values.password)
    })

    return (
        <View style={styles.form}>
            <Text heading center>Sign In</Text>
            <LargeSeperator />
            <TextInput value={formik.values.username} onBlur={() =>formik.setFieldTouched("username", true)} placeholder="Username" onChangeText={formik.handleChange("username")} error={formik.errors.username && formik.touched.username ? true : null}  />
            {formik.touched.username && formik.errors.username ? <Text error >{formik.errors.username}</Text> : null}
            <Seperator />
            <TextInput secureTextEntry value={formik.values.password} onBlur={() =>formik.setFieldTouched("password", true)} placeholder="Password" onChangeText={formik.handleChange("password")} error={formik.errors.password && formik.touched.password ? true : null}/>
            {formik.touched.password && formik.errors.password ? <Text error >{formik.errors.password}</Text> : null}
            <Seperator />
            <Pressable>
                <Button chip onPress={() => formik.handleSubmit()}>Sign In</Button>
            </Pressable>
        </View>
    )
}

export default SignIn