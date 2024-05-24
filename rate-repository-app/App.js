import Main from './src/components/main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from "@apollo/client"
import createApolloClient from './src/utils/ApolloClient'


export default function App() {
  const client = createApolloClient()
  return (
    <ApolloProvider client={client} >
      <NativeRouter>
          <Main />
      </NativeRouter>
    </ApolloProvider>
  );
}