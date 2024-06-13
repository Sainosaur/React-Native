import { View, FlatList, StyleSheet } from "react-native"
import Text from "../CustomComponents/Text"
import { Review } from "../Views/Repository"

import { ME } from "../../graphql/queries"
import { DELETE_REVIEW } from "../../graphql/mutations"

import { useQuery } from "@apollo/client"
import { useMutation } from "@apollo/client"

const styles = StyleSheet.create({
    separator: {
        height: 10
    }
})


const UserReviewList = () => {
    const [mutate] = useMutation(DELETE_REVIEW)
    const { data, refetch } = useQuery(ME, {
        variables: {
            Reviews: true
        }
    })
    if (data) {
        const renderData = data.me.reviews.edges.map(review => review.node)
        return (
            <FlatList
            data = {renderData}
            ItemSeparatorComponent={<View style={styles.separator} />}
            renderItem = {({item}) => <Review review={item} userReviewPage mutate={mutate} refetch={refetch} />}
            />
        )
    }
    return (
        <View>
            <Text>Hello World</Text>
        </View>
    )
}

export default UserReviewList