import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries"

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network"
  })

  if ( data ) {
    return { repositories: data.repositories, loading, refetch}
  } else {
    return { repositories: undefined, loading, refetch }
  }
};

export default useRepositories;