import React, { Fragment, useState } from 'react';
import gql from 'graphql-tag';
import { Query, useMutation } from 'react-apollo';
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

const addItemMutation = gql`
  mutation addItem($name: String!, $price: Float!, $stock: Int!) {
    addItem(name: $name, price: $price, stock: $stock) {
      id
      name
      price
      stock
    }
  }
`;

const AddItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(1.50);
  const [stock, setStock] = useState(10);
  const [addItem, { loading, error, data }] = useMutation(addItemMutation);

  const onAddItem = event => {
    event.preventDefault();

    addItem({
      variables: { name, price, stock },
    })
    .then(() => {
      setName('');
      setPrice(1.50);
      setStock(10);
    });
  };

  const onFieldChange = (setValueHandler, castHandler) => ({ target: { value } }) =>
    setValueHandler(castHandler ? castHandler(value) : value);

  return (
    <div>
      Add a new item:
      <form onSubmit={onAddItem} autoComplete="off">
        <input value={name} onChange={onFieldChange(setName)} required></input>
        <input value={price} onChange={onFieldChange(setPrice, parseFloat)} type="number" step=".1" min="0" required></input>
        <input value={stock} onChange={onFieldChange(setStock, parseInt)} type="number" step="1" min="0" required></input>
        <input type="submit" />
      </form>
    </div>
  );
};

const Items = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <h2>Items</h2>
    <Query query={ItemsQuery}>
      {({ loading, error, data }) => {
        if (loading) return <h4>Loading...</h4>;
        if (error) console.log(error);

        return (
          <Fragment>
            {data.items.map(({ id, name, price, stock }) => (
              <div key={id}>
                <Link to={`/item/${id}`}>
                  #{id}
                </Link>
                {' '}<b>{name}</b> - {price} ({stock})
              </div>
            ))}
          </Fragment>
        );
      }}
    </Query>
    <br />
    <AddItem />
  </div>
);

export default Items;
