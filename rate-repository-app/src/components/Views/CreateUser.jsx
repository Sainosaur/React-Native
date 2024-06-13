import { View, StyleSheet } from "react-native"
import Text from "../CustomComponents/Text"
import { TextInput, Button } from "../CustomComponents/Input"
import theme from "../theme"

import { useNavigate } from "react-router-native"
import { useFormik } from "formik"
import { useMutation } from "@apollo/client"
import useSignIn from "../../hooks/useSignIn"
import * as yup from "yup"

import { ADD_USER } from "../../graphql/mutations"

const styles = StyleSheet.create({
    main: {
        display: "flex",
        backgroundColor: theme.colors.fg,
        paddingBottom: "150%",
        padding: 10
    }, largeSeperator: {
        height: 150
    }, seperator: {
        height: 10
    }
})

const Seperator = () => {
    return <View style={styles.seperator} />
}

const LargeSeperator = () => {
    return <View style={styles.largeSeperator} />
}

const initialValues = {
    username: "",
    password: "",
    confirmPassword: ""
}

const userSchema = yup.object({
    username: yup
        .string()
        .required("Username is required")
        .min(5, "Username must exceed 5 charecters")
        .max(30, "Username cannot exceed 30 charecters"),
    password: yup
        .string()
        .required("Password is required")
        .min(5, "Password must exceed 5 charecters")
        .max(30, "Password cannot exceed 30 charecters"),
    confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords do not match")
})

const RenderCreateUser = ({ onSubmit }) => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit
    })

    return (
        <View style={styles.main}>
            <Seperator />
            <Text  heading center>Sign Up</Text>
            <LargeSeperator />
            <TextInput placeholder="Username" value={formik.values.username} onChangeText={formik.handleChange("username")} error={formik.touched.username && formik.errors.username} onBlur={formik.handleBlur("username")} />
            {formik.touched.username && formik.errors.username ? <Text error >{formik.errors.username}</Text> : null}
            <Seperator />
            <TextInput placeholder="Password" value={formik.values.password} onChangeText={formik.handleChange("password")} onBlur={formik.handleBlur("password")} error={formik.touched.password && formik.errors.password} secureTextEntry />
            {formik.touched.password && formik.errors.password ? <Text error >{formik.errors.password} </Text> : null}
            <Seperator />
            <TextInput placeholder= "Confirm Password" value={formik.values.confirmPassword} onChangeText={formik.handleChange("confirmPassword")} error={formik.touched.confirmPassword && formik.errors.confirmPassword} onBlur={formik.handleBlur("confirmPassword")} secureTextEntry />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <Text error>{formik.errors.confirmPassword}</Text> : null}
            <Seperator />
            <Button onPress={formik.handleSubmit}>Sign Up</Button>
            <Seperator />
            <Text>Already have an account?</Text>
            <Button onPress={() => navigate("/signin")}>Sign In</Button>
        </View>

    )
}

const CreateUser = () => {
    const [mutate] = useMutation(ADD_USER)
    const [signIn, result] = useSignIn()
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        try {
            const { data } = await mutate({
                variables: {
                    user: {
                        username: values.username,
                        password: values.password
                    }
                }
            })
            if (data) {
                signIn({
                    username: values.username,
                    password: values.password
                })
                if (result) {
                    alert(`Welcome ${values.username}`)
                    navigate('/')
                }
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <RenderCreateUser onSubmit={onSubmit} />
    )
}

export default CreateUser;