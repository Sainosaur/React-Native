import Main from './src/components/main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from "@apollo/client"
import authStorageContext from "./src/contexts/authStorageContext"
import authStorageConstructor from "./src/utils/authStorage"

import createApolloClient from './src/utils/ApolloClient'

const authStorage = new authStorageConstructor()

export default function App() {
  const client = createApolloClient(authStorage)

  return (
    <ApolloProvider client={client} >
      <authStorageContext.Provider value={authStorage}>
        <NativeRouter>
            <Main />
        </NativeRouter>
      </authStorageContext.Provider>
    </ApolloProvider>
  );
}