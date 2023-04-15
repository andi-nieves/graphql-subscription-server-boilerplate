
import { pubsub } from '../../constants';

const BUS_ADDED = 'bus';
const userResolvers = {
  Subscription: {
    bus: {
      subscribe: () => pubsub.asyncIterator([BUS_ADDED]),
    },
  },
  Query: {
    allBus: async (root, args, { models: { Bus } }) => Bus.findAll(),
    bus: async (root, { bus_id }, { models: { Bus } }) => await Bus.findOne({ where: { bus_id } }),
  },
  Mutation: {
    createBus: async (root, { newBus }, { models: { Bus } }) => {
      try {
        pubsub.publish(BUS_ADDED, { bus: newBus });
        return Bus.create(newBus);
      } catch (error) {
        console.log('err', error.message);
      }
      return newBus;
    },
    // updateUser: async (root, { id, name }, { models: { User } }) => User.update({
    //   name,
    // }, {
    //   returning: true,
    //   where: {
    //     id,
    //   },
    // }).then(([rowsUpdate, [updated]]) => (rowsUpdate ? updated.dataValues : {})),
    deleteBus: async (root, { bus_id }, { models: { Bus } }) => {
      const result = await Bus.destroy({
        where: {
          bus_id,
        },
      });
      return {
        response: result === 0 ? "No record found" : `${bus_id} successfully deleted`
      }
    },
  },

};

export default userResolvers;
