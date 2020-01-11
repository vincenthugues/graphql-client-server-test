import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const ItemsQuery = gql`
  query ItemsQuery {
    items {
      id
      name
      price
      stock
    }
  }
`;

const Items = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <h2>Items</h2>
    <Query query={ItemsQuery}>
      {({ loading, error, data }) => {
        if (loading) return <h4>Loading...</h4>;
        if (error) console.log(error);

        return <Fragment>{
          data.items.map(({ id, name, price, stock }) => (
            <div key={id}>
              <Link to={`/item/${id}`}>
                #{id}
              </Link>
              {' '}<b>{name}</b> - {price} ({stock})
            </div>
          ))
        }</Fragment>;
      }}
    </Query>
  </div>
);

export default Items;
