import { gql } from 'apollo-server-express';

module.exports = gql`
  type CoordinatesSubscription {
    coordinates: Coordinates!
  } 
  type Coordinates {
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
