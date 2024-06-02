import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
        query {
            repositories {
            edges {
                node {
                    description
                    forksCount
                    fullName
                    id
                    language
                    ownerName
                    ratingAverage
                    ownerAvatarUrl
                    ownerName
                    ratingAverage
                    reviewCount
                    stargazersCount
                }
            }
            }
        }
`

export const ME = gql`
        query {
            me {
                id
                username
            }
        }
`

export const GET_SPECIFIC_REPOSITORY = gql`
        query($id: ID!) {
            repository(id: $id) {
                ownerAvatarUrl
                fullName
                description
                language
                stargazersCount
                forksCount
                reviewCount
                ratingAverage
                url
                reviews {
                    edges {
                        node {
                            text
                            rating
                            createdAt
                            user {
                                username
                            }
                        }
                    }
                }
            }
        }
`