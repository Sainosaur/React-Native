import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context/"
import Constants from 'expo-constants' 
import { relayStylePagination } from "@apollo/client/utilities"

const cache = new InMemoryCache({
    typePolicies: {
        Repository: {
            fields: {
                reviews: relayStylePagination()
            }
        }
    }
})

const createApolloClient = (authStorage) => {
    const httpLink = createHttpLink({
        uri: Constants.expoConfig.extra.APOLLO_URI
    })

    const authLink = setContext(async (_, { headers }) => {
        try {
            const accessToken = await authStorage.getAccessToken()
            return {
                headers: {
                    ...headers,
                    authorization: accessToken ?  `Bearer ${accessToken}` : " "
                }
            }
        } catch(error) {
            console.log(error)
            return {
                headers
            }
        }
    })
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: cache
    })
}

export default createApolloClient