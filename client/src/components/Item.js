import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
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

const editItemMutation = gql`
  mutation editItem($id: String!, $name: String, $price: Float, $stock: Int) {
    editItem(id: $id, name: $name, price: $price, stock: $stock) {
      id
      name
      price
      stock
    }
  }
`;

const ItemView = ({ item: { id, name, price, stock }, onIncreaseStock, onDecreaseStock }) => (
  <Fragment>
    <h2>Item</h2>
    <div>#{id} <b>{name}</b> - {price} ({stock})</div>
    <br />
    <div>
      <input type="button" onClick={onIncreaseStock} value="Stock+" />
      <input type="button" onClick={onDecreaseStock} value="Stock-" />
    </div>
    <br />
    <Link to="/items">Back to items</Link>
  </Fragment>
);

const Item = ({ match: { params: { id } } }) => {
  const { loading: queryLoading, error: queryError, data } = useQuery(ItemQuery, { variables: { id } });
  const [ editItem, { loading: mutationLoading, error: mutationError } ] = useMutation(editItemMutation);
  const onUpdateStock = async stock => editItem({ variables: { id, stock } });

  if (queryLoading || mutationLoading) return <h4>Loading...</h4>;
  if (queryError) return <h4>Unable to get data for this item: {queryError.message}</h4>;
  if (mutationError) return <h4>Unable to update this item: {mutationError.message}</h4>;

  const { item } = data;
  return (
    <ItemView
      item={item}
      onIncreaseStock={() => onUpdateStock(item.stock + 1)}
      onDecreaseStock={() => onUpdateStock(item.stock - 1)}
    />
  );
};

export default Item;
