import { render, screen } from "@testing-library/react-native"
import { RenderRepositoryList } from "../../../components/Views/repositoryList"

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
        render(<RenderRepositoryList repositories={repositories} />)
        const ExpectedStargazersCount = ["21.9K", "1.8K"]
        const ExpectedForksCount = ["1.6K", "69"]
        const Repos = screen.getAllByTestId("RepositoryItem");
        let i = 0;
        Repos.forEach((Repo) => {
                    // Testing to see if all of the content in the repository is rendered accurately.
                    // ForEach loop used to go through both repositories instead of repeating the code. 
                    expect(Repo).toHaveTextContent(repositories.edges[i].node.fullName)
                    expect(Repo).toHaveTextContent(repositories.edges[i].node.description)
                    expect(Repo).toHaveTextContent(repositories.edges[i].node.language)
                    // Stargazers count and forks count accouting for the fact that the app reperesents them using the "K" system with rounding to 1dp
                    expect(Repo).toHaveTextContent(ExpectedForksCount[i])
                    expect(Repo).toHaveTextContent(ExpectedStargazersCount[i])
                    expect(Repo).toHaveTextContent(repositories.edges[i].node.ratingAverage)
                    expect(Repo).toHaveTextContent(repositories.edges[i].node.reviewCount)
                    i++
        })
      });
    });
  });