import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "./graphql/apolloClient.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <App />
    </Provider>
      </ApolloProvider>
  </StrictMode>,
);
