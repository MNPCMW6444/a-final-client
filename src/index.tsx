import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import reportWebVitals from "./reportWebVitals";

import store from "./store/store.ts";
import { Provider as ReduxProvider } from "react-redux";

import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql-subscriptions",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const rootElement: HTMLElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>{" "}
    </ApolloProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("/sw.js").then(() => {
//     console.log("PWA Service Worker Registered");
//   });
// }

// // Code to handle install prompt on desktop

// //let deferredPrompt;
// //const addBtn: any = document.querySelector(".add-button");
// //addBtn.style.display = "none";      //////     CAN BE USED TO IMPROVE iOS UX

// window.addEventListener("beforeinstallprompt", (e) => {
//   //////     CAN BE USED TO IMPROVE iOS UX
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   //deferredPrompt = e;
//   // Update UI to notify the user they can add to home screen
//   //addBtn.style.display = "block";      //////     CAN BE USED TO IMPROVE iOS UX

//   /*addBtn.addEventListener("click", () => {
//     // hide our user interface that shows our A2HS button
//     //addBtn.style.display = "none";
//     // Show the prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice.then((choiceResult: any) => {
//       if (choiceResult.outcome === "accepted") {
//         console.log("User accepted the A2HS prompt");
//       } else {
//         console.log("User dismissed the A2HS prompt");
//       }
//       deferredPrompt = null;
//     });
//   });*/ /////     CAN BE USED TO IMPROVE iOS UX
// });
