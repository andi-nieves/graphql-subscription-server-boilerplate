// @flow
import { gql } from 'apollo-server-express';
import busTypes from './bus/types';
import coordinatesTypes from './coordinates/types';


const queryTypes = gql`
  scalar Date

  directive @capitalize on FIELD_DEFINITION
  directive @date(
    defaultFormat: String = "MMMM Do YYYY"
  ) on FIELD_DEFINITION

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const combinedTypes = [busTypes, queryTypes, coordinatesTypes];

export default combinedTypes;
