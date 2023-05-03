import { gql } from 'apollo-server-express';

module.exports = gql`
  extend type Subscription {
    coordinates(bus_id: String!): Coordinates!
  } 
  type Coordinates {
    id: ID!
    bus_id: String!
    latitude: String!
    longitude: String!
    createdAt: String!
  }

  input coordinateInput {
    bus_id: String!
    latitude: String!
    longitude: String!
  }

  extend type Query {
    coordinates(bus_id: String!): [Coordinates]!
  }
  extend type Mutation {
    addCoordinates(coordinates: coordinateInput): Coordinates!
  }
`;
