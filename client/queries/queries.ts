import gql from 'graphql-tag';

import { PER_PAGE } from '../config';

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${PER_PAGE}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
      largeImage
    }
  }
`;

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    userDetails {
      id
      email
      name
      permissions
    }
  }
`;
