import { pubsub } from '../../constants';
import Jimp from "jimp";
import fs from 'fs';

const BUS_ADDED = 'bus';
const BUS_UPDATED = 'bus_updated';

const saveImage = (image, name) => {
  if (!image) return 
  Jimp.read(Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64'), function (err, image) {
    if (err) {
      console.log(err)
    } else {
      // console.log('im', image)
      image.write(`images/${name}.png`)
    }
  })
}

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
        const busImageUrl = newBus.bus_image
        delete newBus.bus_image
        const driverImageUrl = newBus.driver_image
        delete newBus.driver_image
        const conductorImageUrl = newBus.conductor_image
        delete newBus.conductor_image
        
        const details = await Bus.create(newBus)
        pubsub.publish(BUS_ADDED, { bus: details })
        saveImage(busImageUrl, `bus-${details.dataValues.id}`)
        saveImage(driverImageUrl, `driver-${details.dataValues.id}`)
        saveImage(conductorImageUrl, `conductor-${details.dataValues.id}`)
        return details
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
    updateSelected: async (
      root,
      { bus, id },
      { models: { Bus } },
    ) => {
      try {
        const busImageUrl = bus.bus_image
        delete bus.bus_image
        const driverImageUrl = bus.driver_image
        delete bus.driver_image
        const conductorImageUrl = bus.conductor_image
        delete bus.conductor_image

        const details = await Bus.update(bus, { returning: true, where: { id } },
        ).then(([rowsUpdate, [updated]]) =>
          rowsUpdate ? updated.dataValues : {},
        );
        
        pubsub.publish(BUS_UPDATED, { getBus: details });
        saveImage(busImageUrl, `bus-${id}`)
        saveImage(driverImageUrl, `driver-${id}`)
        saveImage(conductorImageUrl, `conductor-${id}`)
        return details
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
