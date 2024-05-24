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