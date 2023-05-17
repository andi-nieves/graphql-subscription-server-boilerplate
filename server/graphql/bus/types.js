import { gql } from 'apollo-server-express';

module.exports = gql`
  type Subscription {
    bus: Bus!
  } 
  extend type Subscription {
    getBus(bus_id: String!): Bus!
  } 
  type Bus {
    id: Int
    bus_id: String
    passenger_count: Int
    bus_name: String
    departure: String
    arrival: String
    createdAt: String
    updatedAt: String
    driver_name: String
    driver_contact: String
    conductor_name: String
    conductor_contact: String
  }

  input busInput {
    bus_id: String!
    passenger_count: Int
    bus_name: String!
    departure: String!
    arrival: String!
    bus_image: Upload
    driver_image: Upload
    conductor_image: Upload
    driver_name: String
    driver_contact: String
    conductor_name: String
    conductor_contact: String
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
    updateSelected(id: Int!, bus: busInput): Bus!
  }
`;
