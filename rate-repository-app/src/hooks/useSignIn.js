import { AUTHENTICATE_USER } from '../graphql/mutations'
import { useMutation } from '@apollo/client'


const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE_USER);

    const signIn = async ({ username, password }) => {
        await mutate({
            variables: {
                credentials: {
                    username,
                    password
                }
            }
        })
        return result
    }

    return [signIn, result]
}

export default useSignIn