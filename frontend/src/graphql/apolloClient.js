import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import store from "../redux/store";

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED" || 
          err.message?.toLowerCase().includes("unauthorized") ||
          err.message?.toLowerCase().includes("expired") ||
          err.message?.toLowerCase().includes("invalid token")) {
        store.dispatch({ type: "auth/logout" });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
  }

  if (networkError && networkError.statusCode === 401) {
    store.dispatch({ type: "auth/logout" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
});

const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;