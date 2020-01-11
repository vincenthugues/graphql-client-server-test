import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './App.css';
import Launches from './components/Launches'

const SERVER_HOST = 'http://localhost:4000';

const client = new ApolloClient({
  uri: `${SERVER_HOST}/graphql`,
})

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h1>API data</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50%' }}>
          <Launches />
        </div>
        <div style={{ width: '50%' }}>
          <Launches />
        </div>
      </div>
    </div>
  </ApolloProvider>
);

export default App;
