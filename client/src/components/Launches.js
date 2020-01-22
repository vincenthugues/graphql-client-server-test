import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

const LAUNCH_SUCCESS_STRING = {
  null: 'N/A',
  true: 'Success',
  false: 'Failure'
};

const LAUNCH_SUCCESS_COLOR = {
  null: 'black',
  true: 'green',
  false: 'red'
};

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

const LaunchItem = ({ launch: {flight_number, mission_name, launch_date_local, launch_success} }) => (
  <div>
    #{flight_number}{' '}
    <Link to={`/spacex/launch/${flight_number}`}>
      <b>{mission_name}</b>
    </Link>
    {' '}
    - {new Date(launch_date_local).toLocaleString()}{' '}
    - {' '}
    <em style={{color: LAUNCH_SUCCESS_COLOR[launch_success]}}>
      {LAUNCH_SUCCESS_STRING[launch_success]}
    </em>
  </div>
);

const Launches = () => (
  <Fragment>
    <h2>Launches</h2>
    <Query query={LaunchesQuery}>
      {({ loading, error, data }) => {
        if (loading) return <Loader active />;
        if (error) console.log(error);

        return (
          <Fragment>
            {data.launches.map(launch =>
              <LaunchItem key={launch.flight_number} launch={launch} />
            )}
          </Fragment>
        );
      }}
    </Query>
  </Fragment>
);

export default Launches;
