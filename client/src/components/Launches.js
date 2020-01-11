import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import LaunchItem from './LaunchItem';

const LaunchesQuery = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export class Launches extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Launches</h2>
        <Query query={LaunchesQuery}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return <Fragment>
              {
                data.launches.map(launch => <LaunchItem key={launch.flight_number} launch={launch} />)
              }
            </Fragment>;
          }}
        </Query>
      </div>
    );
  }
}

export default Launches;
