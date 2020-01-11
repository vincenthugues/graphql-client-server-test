import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const RocketsQuery = gql`
  query RocketsQuery {
    rockets {
      rocket_id
      rocket_name
      rocket_type
    }
  }
`;

const Rockets = () => (
  <Fragment>
    <h2>Rockets</h2>
    <Query query={RocketsQuery}>
      {({ loading, error, data }) => {
        if (loading) return <h4>Loading...</h4>;
        if (error) console.log(error);

        return (
          <Fragment>
            {data.rockets.map(({ rocket_id, rocket_name, rocket_type }) =>
              <div key={rocket_id}>
                <Link to={`/spacex/rocket/${rocket_id}`}>
                  #{rocket_id}
                </Link>
                {' '}<b>{rocket_name}</b> ({rocket_type})
              </div>
            )}
          </Fragment>
        );
      }}
    </Query>
  </Fragment>
);

export default Rockets;
