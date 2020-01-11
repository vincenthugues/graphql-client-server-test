import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const ItemQuery = gql`
  query ItemQuery($id: String!) {
    item(id: $id) {
      id
      name
      price
      stock
    }
  }
`;

const Item = ({ match: { params: { id } } }) => (
  <Fragment>
    <h2>Item</h2>
    <Query query={ItemQuery} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <h4>Loading...</h4>;
        if (error) {
          console.log(error.message);
          return <h4>Unable to get data for this item</h4>;
        }

        const {
          id,
          name,
          price,
          stock,
        } = data.item;

        return (
          <div key={id}> #{id} <b>{name}</b> - {price} ({stock}) </div>
        );
      }}
    </Query>
    <br />
    <Link to="/items">Back to items</Link>
  </Fragment>
);

export default Item;
