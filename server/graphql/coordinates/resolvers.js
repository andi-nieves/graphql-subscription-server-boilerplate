
import { pubsub } from '../../constants';
const SUBSCRIPTION_KEY = 'COORDINATES_ADDED';

const resolvers = {
  CoordinatesSubscription: {
    coordinates: {
      subscribe: () => pubsub.asyncIterator([SUBSCRIPTION_KEY]),
    },
  },
  Query: {
    // coordinates: async (root, args, { models: { Coordinates } }) => Coordinates.findAll(),
    coordinates: async (root, { bus_id }, { models: { Coordinates } }) => await Coordinates.findAll({ where: { bus_id } }),
  },
  Mutation: {
    addCoordinates: async (root, { coordinates }, { models: { Coordinates, Bus } }) => {
      console.log(">>", coordinates)
      try {
        const details = Coordinates.create(coordinates);
        pubsub.publish(SUBSCRIPTION_KEY, { coordinates: details });
        return  details
      } catch (error) {
        console.log('err', error);
      }
    },
  },

};

export default resolvers;
