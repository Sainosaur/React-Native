import { View, StyleSheet } from "react-native";
import Text from "../CustomComponents/Text";
import { Button, TextInput } from "../CustomComponents/Input"
import theme from "../theme"

import { ADD_REVIEW } from "../../graphql/mutations"

import { useMutation } from "@apollo/client"
import { useFormik } from "formik";
import * as yup from "yup";

const reviewSchema = yup.object({
    username: yup.string().required("Owner's name  is a required field"),
    RepoName: yup.string().required("Repository Name is a required field"),
    Rating: yup.number("Rating must be a number1")
    .min(0, "Rating must be above 0")
    .max(100, "Rating must be less than 100")
    .required("Rating is a required field"),
    ReviewText: yup.string().nullable()
})

const initialValues = {
    username: "",
    RepoName: "",
    Rating: "",
    ReviewText: ""
}

const styles = StyleSheet.create({
    main: {
        padding: 10,
        backgroundColor: theme.colors.fg
    }, form: {
        paddingTop: 125,
        paddingBottom: 300
    }, separator: {
        height: 10
    }
})

const ItemSeperator = () => {
    return (
        <View style={styles.separator}/>
    )
}

const RenderCreateReview = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema: reviewSchema,
        onSubmit
    })
    return (
        <View style={styles.main}>
            <Text heading center>Create a Review</Text>
            <View style={styles.form}>
                <TextInput value={formik.values.username} placeholder="Owner's Username" onChangeText={formik.handleChange("username")} error={formik.touched.username && formik.errors.username} />
                {formik.touched.username && formik.errors.username ? <Text error>{formik.errors.username}</Text> : null }
                <ItemSeperator />
                <TextInput value={formik.values.RepoName} placeholder="Repository Name" onChangeText={formik.handleChange("RepoName")} error={formik.touched.RepoName && formik.errors.RepoName}/>
                {formik.touched.RepoName && formik.errors.RepoName ? <Text error>{formik.errors.RepoName}</Text> : null}
                <ItemSeperator />
                <TextInput value={formik.values.Rating} placeholder="Rating" onChangeText={formik.handleChange("Rating")} error={formik.touched.Rating && formik.errors.Rating} />
                {formik.touched.Rating && formik.errors.Rating ? <Text error>{formik.errors.Rating}</Text> : null}
                <ItemSeperator />
                <TextInput value={formik.values.ReviewText} placeholder="Review" onChangeText={formik.handleChange("ReviewText")} multiline />
                <ItemSeperator />
                <Button onPress={() => formik.handleSubmit()} >Add</Button>
            </View>
            
        </View>
    )
}


const CreateReview = () => {
    const [mutate] = useMutation(ADD_REVIEW)

    const onSubmit = async (values) => {
        try {
            const { data } = await mutate({
                variables: {
                    review: {
                        ownerName: values.username,
                        rating: Number(values.Rating),
                        repositoryName: values.RepoName,
                        text: values.ReviewText
                    }
                }
            })
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <RenderCreateReview onSubmit={onSubmit} />
    )
}

export default CreateReview