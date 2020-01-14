import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
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
  const [addItem, { loading, error }] = useMutation(addItemMutation, {
    update: (cache, { data: { addItem: newItem } }) => {
      const { items } = cache.readQuery({ query: ItemsQuery });
      cache.writeQuery({
        query: ItemsQuery,
        data: { items: [...items, newItem] },
      });
    }
  });

  const onAddItem = async event => {
    event.preventDefault();

    await addItem({ variables: { name, price, stock } });

    setName('');
    setPrice(1.50);
    setStock(10);
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
      {loading && <h4>Loading...</h4>}
      {error && <h4>Error: {error}</h4>}
    </div>
  );
};

const Items = () => {
  const { loading, error, data } = useQuery(ItemsQuery);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Items</h2>
        {loading && <h4>Loading...</h4>}
        {error && <h4>Error: {error}</h4>}

        {data && data.items.map(({ id, name, price, stock }) => (
          <div key={id}>
            <Link to={`/item/${id}`}>
              #{id}
            </Link>
            {' '}<b>{name}</b> - {price} ({stock})
          </div>
        ))}
      <br />
      <AddItem />
    </div>
  );
};

export default Items;
