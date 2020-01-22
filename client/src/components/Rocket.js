import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

const RocketQuery = gql`
  query RocketQuery($rocket_id: String!) {
    rocket(rocket_id: $rocket_id) {
      rocket_id
      rocket_name
      rocket_type
    }
  }
`;

const Rocket = ({ match: { params: { rocket_id } } }) => (
  <Fragment>
    <h2>Rocket</h2>
    <Query query={RocketQuery} variables={{ rocket_id }}>
      {({ loading, error, data }) => {
        if (loading) return <Loader active />;
        if (error) {
          console.log(error.message);
          return <h4>Unable to get data for this rocket</h4>;
        }

        const {
          rocket_id,
          rocket_name,
          rocket_type,
        } = data.rocket;

        return (
          <div>
            Rocket id: {rocket_id}<br />
            Name: {rocket_name}<br />
            Type: {rocket_type}
          </div>
        );
      }}
    </Query>
    <br />
    <Link to="/spacex/rockets">Back to rockets</Link>
  </Fragment>
);

export default Rocket;
