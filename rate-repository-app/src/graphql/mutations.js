import { gql } from "@apollo/client"

export const AUTHENTICATE_USER = gql`
mutation($credentials: AuthenticateInput) {
    authenticate (credentials: $credentials) {
        accessToken
    }
}
`

export const ADD_REVIEW = gql`
mutation ($review: CreateReviewInput) {
    createReview(review: $review) {
        text
    }
}

`

export const ADD_USER = gql`
mutation ($user: CreateUserInput) {
    createUser(user: $user) {
        username
    }
}

`