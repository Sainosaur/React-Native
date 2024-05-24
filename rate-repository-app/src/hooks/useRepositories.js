import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries"

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES)

  if ( data ) {
    return { repositories: data.repositories, loading, refetch}
  } else {
    return { repositories: undefined, loading, refetch }
  }
};

export default useRepositories;