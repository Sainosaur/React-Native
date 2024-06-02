import { View, Text as NativeText, FlatList, StyleSheet } from "react-native"
import Text from "../CustomComponents/Text"
import { RepositoryItem } from "./repositoryList"
import theme from "../theme"

import { GET_SPECIFIC_REPOSITORY } from "../../graphql/queries"

import { useParams } from "react-router-native"
import { useQuery } from "@apollo/client"



const styles = StyleSheet.create({
    review: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: theme.colors.fg,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 5
    }, reviewsContainer: {
        padding: 5,
    }, separator: {
        height: 10
    }, rating: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderColor: theme.colors.primary,
        paddingTop: 10,
        borderWidth: 2,
        width: 50,
        height: 50,
        borderRadius: 25,
    }, ratingText: {
        fontSize: 20,
        color: theme.colors.primary,
        fontWeight: "bold"
    }, text: {
        paddingRight: 70
    }, reviewContent: {
        paddingLeft: 20
    }, largeSeperator: {
        height: 30
    }
})
const ItemSeparator = () => <View style={styles.separator} />;

const RenderRepository = ({item}) => {
    return (
        <View>
            <RepositoryItem item={item} github />
            <ItemSeparator />
            <Text heading>Reviews:</Text>
            <ItemSeparator />
        </View>
    )
}

const Review = ({review}) => {
    const createdAt = new Date(review.createdAt)
    return (
        <View style={styles.review}>
            <View style={styles.rating}>
                <NativeText style={styles.ratingText}>{review.rating}</NativeText>
            </View>
            <View style={styles.reviewContent}>
                <Text heading >{review.user.username}</Text>
                <Text light > Created: {createdAt.toLocaleDateString("en-GB")}</Text>
                <NativeText style={styles.text}  >{review.text}</NativeText>
            </View>
        </View>
    )
}

const Repository = () => {
    const params = useParams()

    const { data } = useQuery(GET_SPECIFIC_REPOSITORY, {
        variables: {
            id: params.repoID
        }
    })
    if (data) {
        const item = data.repository
        const reviews = data.repository.reviews.edges.map(review => review.node)
        return (
        <FlatList 
        style={styles.reviewsContainer} 
        data={reviews} 
        ItemSeparatorComponent={ItemSeparator} renderItem={({ item }) => <Review review={item} />}
        ListHeaderComponent={() => <RenderRepository item={item} />} 
        ListFooterComponent={() => <View style={styles.largeSeperator} />} />
        )
    }

}

export default Repository