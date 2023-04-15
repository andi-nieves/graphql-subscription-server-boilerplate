import { gql } from 'apollo-server-express';

module.exports = gql`
  type Subscription {
    bus: Bus!
  } 
  type Bus {
    bus_id: String!
    passenger_count: Int!
    coordinates: String!
    bus_name: String!
    departure: String!
    arrival: String!
    createdAt: Date @date(defaultFormat: "MM-DD-YYYY hh:mm A")
  }

  input busInput {
    bus_id: String!
    passenger_count: Int!
    coordinates: String!
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
    updateBus(bus: busInput): Bus!
  }
`;
