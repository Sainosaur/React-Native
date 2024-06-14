import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
        query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
            repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
        query($Reviews: Boolean = false) {
            me {
                id
                username
                reviews @include(if: $Reviews) {
                    edges {
                        node {
                            repository {
                                id
                                fullName
                            }
                            id
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

export const GET_SPECIFIC_REPOSITORY = gql`
        query($id: ID!, $first: Int, $after: String) {
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
                reviews(first: $first, after: $after) {
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
                    pageInfo {
                        endCursor
                        startCursor
                        hasNextPage
                    }
                }
            }
        }
`