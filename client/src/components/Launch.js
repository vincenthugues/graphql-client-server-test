import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const LaunchQuery = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = ({ match: { params: { flight_number } } }) => (
  <Fragment>
    <h2>Launch</h2>
    <Query query={LaunchQuery} variables={{ flight_number: parseInt(flight_number) }}>
      {({ loading, error, data }) => {
        if (loading) return <h4>Loading...</h4>;
        if (error) {
          console.log(error.message);
          return <h4>Unable to get data for this launch</h4>;
        }

        const {
          flight_number,
          mission_name,
          launch_year,
          launch_date_local,
          launch_success,
          rocket: {
            rocket_id,
            rocket_name,
            rocket_type,
          },
        } = data.launch;

        return (
          <div>
            Flight number: {flight_number}<br />
            Mission: {mission_name} ({launch_year})<br />
            Date: {new Date(launch_date_local).toLocaleString()}<br />
            Success: {launch_success !== null ? String(launch_success) : 'N/A'}<br />
            <br />
            Rocket id: {rocket_id}<br />
            Name: {rocket_name}<br />
            Type: {rocket_type}
          </div>
        );
      }}
    </Query>
    <br />
    <Link to="/spacex/launches">Back to launches</Link>
  </Fragment>
);

export default Launch;
