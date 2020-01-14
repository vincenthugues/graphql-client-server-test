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

const deleteItemMutation = gql`
  mutation deleteItem($id: String!) {
    deleteItem(id: $id) {
      id
      name
      price
      stock
    }
  }
`;

const ItemView = ({ item: { id, name, price, stock }, onIncreaseStock, onDecreaseStock, onDeleteItem, isDeleted }) => (
  <Fragment>
    <h2>Item</h2>
    {isDeleted ? (
      <em>deleted</em>
    ) : (
      <Fragment>
        <div>#{id} <b>{name}</b> - {price} ({stock})</div>
        <br />
        <div>
          <input type="button" onClick={onIncreaseStock} value="Stock+" />
          <input type="button" onClick={onDecreaseStock} value="Stock-" />
        </div>
        <br />
        <input type="button" onClick={onDeleteItem} value="Delete" />
      </Fragment>
    )}
    <br />
    <Link to="/items">Back to items</Link>
  </Fragment>
);

const Item = ({ match: { params: { id } } }) => {
  const { loading: queryLoading, error: queryError, data } = useQuery(ItemQuery, { variables: { id } });
  const [ editItem, { loading: editLoading, error: editError } ] = useMutation(editItemMutation);
  const [ deleteItem, { loading: deleteLoading, error: deleteError, data: deletedItem } ] = useMutation(deleteItemMutation);
  const onUpdateStock = stock => editItem({ variables: { id, stock } });
  const onDeleteItem = () => deleteItem({ variables: { id } });

  if (queryLoading || editLoading || deleteLoading) return <h4>Loading...</h4>;
  if (queryError) return <h4>Unable to get data for this item: {queryError.message}</h4>;
  if (editError) return <h4>Unable to update this item: {editError.message}</h4>;
  if (deleteError) return <h4>Unable to delete this item: {deleteError.message}</h4>;

  const { item } = data;
  return (
    <ItemView
      item={item}
      onIncreaseStock={() => onUpdateStock(item.stock + 1)}
      onDecreaseStock={() => onUpdateStock(item.stock - 1)}
      onDeleteItem={onDeleteItem}
      isDeleted={!!deletedItem}
    />
  );
};

export default Item;
