import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries"

const useRepositories = (sortMethod, search) => {
  let variables;
  switch (sortMethod) {
    case "LatestRepo": 
      variables = {orderBy: "CREATED_AT"}
      break;
    case "HighRepo":
      variables = {orderBy: "RATING_AVERAGE", orderDirection: "DESC"}
      break;
    case "LowRepo":
      variables = {orderBy: "RATING_AVERAGE", orderDirection: "ASC"}
  }

  variables.searchKeyword = search;

  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables
  })

  if ( data ) {
    return { repositories: data.repositories, loading, refetch}
  } else {
    return { repositories: undefined, loading, refetch }
  }
};

export default useRepositories;