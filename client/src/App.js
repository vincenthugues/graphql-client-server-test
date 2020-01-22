import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Container, Divider, Header, Menu } from 'semantic-ui-react';

import Launches from './components/Launches';
import Launch from './components/Launch';
import Rockets from './components/Rockets';
import Rocket from './components/Rocket';
import Items from './components/Items';
import Item from './components/Item';

const client = new ApolloClient({
  uri: '/graphql',
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
      <Container>
        <Header as="h1">API data</Header>
        <Menu>
          <Menu.Item><Link to='/items'>Items</Link></Menu.Item>
          <Menu.Item><Link to='/spacex'>SpaceX</Link></Menu.Item>
          <Menu.Item><Link to='/spacex/launches'>SpaceX launches</Link></Menu.Item>
          <Menu.Item><Link to='/spacex/rockets'>SpaceX rockets</Link></Menu.Item>
        </Menu>
        <Divider />
        <Container>
          <Switch>
            <Route exact path='/spacex' component={SpaceX} />
            <Route exact path='/spacex/launches' component={Launches} />
            <Route exact path='/spacex/launch/:flight_number' component={Launch} />
            <Route exact path='/spacex/rockets' component={Rockets} />
            <Route exact path='/spacex/rocket/:rocket_id' component={Rocket} />
            <Route exact path='/item/:id' component={Item} />
            <Route exact path='/items' component={Items} />
          </Switch>
        </Container>
      </Container>
    </Router>
  </ApolloProvider>
);

export default App;
