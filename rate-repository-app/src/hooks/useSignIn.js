import { AUTHENTICATE_USER } from '../graphql/mutations'


import { useMutation } from '@apollo/client'
import useAuthStorage from "../hooks/useAuthStorage"
import { useApolloClient } from "@apollo/client"

import authStorageContext from "../utils/authStorageContext"

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE_USER);
    const authStorage = useAuthStorage()
    const ApolloClient = useApolloClient()

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({
            variables: {
                credentials: {
                    username,
                    password
                }
            }
        })
        await authStorage.setAccessToken(data.authenticate.accessToken)
        ApolloClient.resetStore()

        return result
    }

    return [signIn, result]
}

export default useSignIn