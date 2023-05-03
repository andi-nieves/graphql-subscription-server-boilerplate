import { pubsub } from '../../constants';

const BUS_ADDED = 'bus';
const BUS_UPDATED = 'bus_updated';
const userResolvers = {
  Subscription: {
    bus: {
      subscribe: () => pubsub.asyncIterator([BUS_ADDED]),
    },
    getBus: {
      subscribe: async () => pubsub.asyncIterator([BUS_UPDATED])
    }
  },
  Query: {
    allBus: async (root, args, { models: { Bus } }) => Bus.findAll(),
    bus: async (root, { bus_id }, { models: { Bus } }) =>
      await Bus.findOne({ where: { bus_id } }),
  },
  Mutation: {
    createBus: async (root, { newBus }, { models: { Bus } }) => {
      try {
        const x = await Bus.findOne({ where: { bus_id: newBus.bus_id } });
        if (x) {
          throw new Error('Bus ID already added');
        }
        pubsub.publish(BUS_ADDED, { bus: newBus });
        return Bus.create(newBus);
      } catch (error) {
        return error;
      }
    },
    updateBus: async (
      root,
      { bus_id, passenger_count },
      { models: { Bus } },
    ) => {
      try {
        const x = await Bus.findOne({ where: { bus_id } })
        let pc = +x.passenger_count
        let res = passenger_count == 1 ? ++pc : --pc
        const bus = await Bus.update(
          { passenger_count: res <= 0 ? 0 : res },
          { returning: true, where: { bus_id } },
        ).then(([rowsUpdate, [updated]]) =>
          rowsUpdate ? updated.dataValues : {},
        );
        pubsub.publish(BUS_UPDATED, { getBus: bus });
        return bus
      } catch (error) {
        return error;
      }
    },
    deleteBus: async (root, { bus_id }, { models: { Bus } }) => {
      const result = await Bus.destroy({
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

export default userResolvers;
