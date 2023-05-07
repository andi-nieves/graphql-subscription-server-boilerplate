
import { pubsub } from '../../constants';
const SUBSCRIPTION_KEY = 'COORDINATES_ADDED';

const resolvers = {
  Subscription: {
    coordinates: {
      subscribe: async () => pubsub.asyncIterator([SUBSCRIPTION_KEY]),
    },
  },
  Query: {
    // coordinates: async (root, args, { models: { Coordinates } }) => Coordinates.findAll(),
    coordinates: async (root, { bus_id }, { models: { Coordinates } }) => await Coordinates.findAll({ where: { bus_id }, order: [['createdAt', 'DESC']] }),
  },
  Mutation: {
    addCoordinates: async (root, { coordinates }, { models: { Coordinates } }) => {
      try {
        const { latitude, longitude, bus_id } = coordinates
        const count = await Coordinates.findAll({ where: { bus_id }})
        if (count.length === 0) {
            const details = Coordinates.create(coordinates);
            pubsub.publish(SUBSCRIPTION_KEY, { coordinates: details });
            return  details
        }  else {
            const details = await Coordinates.update(
              { latitude, longitude },
              { returning: true, where: { bus_id } },
            ).then(([rowsUpdate, [updated]]) =>
              rowsUpdate ? updated.dataValues : {},
            );
            return details
        }
      } catch (error) {
        console.log('err', error);
      }
    },
    deleteCoordinates: async (root, { bus_id }, { models: { Coordinates } }) => {
      const result = await Coordinates.destroy({
        where: {
          bus_id,
        },
      });
      return {
        response:
          result === 0 ? 'No record found' : `${bus_id} successfully deleted`,
      };
    },
  },

};

export default resolvers;
