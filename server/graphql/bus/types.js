import { gql } from 'apollo-server-express';

module.exports = gql`
  type Subscription {
    bus: Bus!
  } 
  extend type Subscription {
    getBus(bus_id: String!): Bus!
  } 
  type Bus {
    bus_id: String
    passenger_count: Int
    bus_name: String
    departure: String
    arrival: String
    createdAt: String
    updatedAt: String
  }

  input busInput {
    bus_id: String!
    passenger_count: Int
    bus_name: String!
    departure: String!
    arrival: String!
  }

  extend type Query {
    bus(bus_id: String!): Bus!
    allBus: [Bus!]
  }

  type DeleteRes{
    response:String!
  }

  extend type Mutation {
    createBus(newBus: busInput): Bus!
    deleteBus(bus_id: String!): DeleteRes!
    updateBus(bus_id: String!, passenger_count: Int!): Bus!
  }
`;
