import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import App from './App.tsx'
import './index.css'
import client from './appoloClient.tsx' 

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);