import { View, Text as NativeText, FlatList, StyleSheet, Platform } from "react-native"
import Text from "../CustomComponents/Text"
import { RepositoryItem } from "./repositoryList"
import { Button } from "../CustomComponents/Input"
import theme from "../theme"

import { GET_SPECIFIC_REPOSITORY } from "../../graphql/queries"

import { useParams } from "react-router-native"
import { useQuery } from "@apollo/client"
import { useNavigate } from "react-router-native"




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
        height: Platform.select({
            android: 30,
            ios: 70
        })
    }, buttonContainer: {
        display: "flex",
        flexDirection: "row"
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

export const Review = ({review, userReviewPage, mutate, refetch}) => {
    const navigate = useNavigate()
    const createdAt = new Date(review.createdAt)
    return (
        <View style={styles.review}>
            <View style={styles.rating}>
                <NativeText style={styles.ratingText}>{review.rating}</NativeText>
            </View>
            <View style={styles.reviewContent}>
                <Text heading >{userReviewPage ? review.repository.fullName : review.user.username}</Text>
                <Text light > Created: {createdAt.toLocaleDateString("en-GB")}</Text>
                <NativeText style={styles.text}  >{review.text}</NativeText>
                { userReviewPage ?  <View style={styles.buttonContainer}>
                    <Button onPress={() => navigate(`/repositories/${review.repository.id}`)} fontSize={15}>View Repository</Button>
                    <Button fontSize={15} color="#c10101" onPress={() => { 
                        mutate({variables:{
                            reviewID: review.id
                        }
                        })
                        refetch()
                    } 
                        } >Delete Review</Button>
                </View> : null}
            </View>
            <View>
            </View>
        </View>
    )
}

const Footer = ({endOfPage}) => {
    return (
        <View>
        {endOfPage ? <Text center light>You have reached the end...</Text> : null}
        <View style={styles.largeSeperator} />
        </View>
    )
}

const Repository = () => {
    const params = useParams()
    const { data, fetchMore } = useQuery(GET_SPECIFIC_REPOSITORY, {
        variables: {
            id: params.repoID,
            first: 5
        }, fetchPolicy: "cache-and-network"
    })
    const endReached = () => {
        if (data.repository.reviews.pageInfo.hasNextPage) {
            fetchMore({
                variables: {
                    after: data.repository.reviews.pageInfo.endCursor
                }
            })
        }

    }

    if (data) {
        const item = data.repository
        const reviews = data.repository.reviews.edges.map(review => review.node)
        return (
            <FlatList 
            style={styles.reviewsContainer} 
            data={reviews} 
            ItemSeparatorComponent={ItemSeparator} 
            renderItem={({ item }) => <Review review={item} />}
            ListHeaderComponent={() => <RenderRepository item={item} />} 
            ListFooterComponent={() => <Footer endOfPage={!data.repository.reviews.pageInfo.hasNextPage} />}
            onEndReached={endReached}
            onEndReachedThreshold={0}
            />
        )
    }

}

export default Repository