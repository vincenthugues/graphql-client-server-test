import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';
import Launches from './components/Launches';
import Launch from './components/Launch';
import Rockets from './components/Rockets';
import Rocket from './components/Rocket';
import Items from './components/Items';
import Item from './components/Item';

const SERVER_HOST = 'http://localhost:4000';

const client = new ApolloClient({
  uri: `${SERVER_HOST}/graphql`,
})

const SpaceX = () => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
    <div style={{ width: '50%' }}>
      <Launches />
    </div>
    <div style={{ width: '50%' }}>
      <Rockets />
    </div>
  </div>
);

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <h1>API data</h1>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div><Link to='/items'>Items</Link></div>
          <div>&nbsp;<Link to='/spacex'>SpaceX</Link></div>
          <div>&nbsp;<Link to='/spacex/launches'>SpaceX launches</Link></div>
          <div>&nbsp;<Link to='/spacex/rockets'>SpaceX rockets</Link></div>
        </div>
        <Switch>
          <Route exact path='/spacex' component={SpaceX} />
          <Route exact path='/spacex/launches' component={Launches} />
          <Route exact path='/spacex/launch/:flight_number' component={Launch} />
          <Route exact path='/spacex/rockets' component={Rockets} />
          <Route exact path='/spacex/rocket/:rocket_id' component={Rocket} />
          <Route exact path='/item/:id' component={Item} />
          <Route exact path='/items' component={Items} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
