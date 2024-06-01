import { View } from "react-native"
import { RepositoryItem } from "./repositoryList"

import { GET_SPECIFIC_REPOSITORY } from "../../graphql/queries"

import { useParams } from "react-router-native"
import { useQuery } from "@apollo/client"


const Repository = () => {
    const params = useParams()

    const { data } = useQuery(GET_SPECIFIC_REPOSITORY, {
        variables: {
            id: params.repoID
        }
    })

    if (data) {
        return (
            <View >
                <RepositoryItem item={data.repository} github />
            </View>
        )
    }

}

export default Repository