// src/apolloClient.js
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://your-graphql-endpoint.com/graphql", // Replace with your actual GraphQL API
  cache: new InMemoryCache(),
});

export default client;
