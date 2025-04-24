import { FilterQuery, PipelineStage } from 'mongoose';
import Publisher, { IPublisher } from '../models/publisher';

/**
 * Publisher service mirroring original JS promises with TypeScript typings.
 */
export default {
  /** List publishers */
  list(query: FilterQuery<IPublisher>): Promise<Partial<IPublisher>[]> {
    return new Promise((resolve, reject) => {
      Publisher.find(query)
        .lean()
        .exec()
        .then((res) => {
          if (res) console.log({ query }, 'Lists Publishers');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** List publishers along with their zones */
  listAndZones(query: FilterQuery<IPublisher>): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const pipeline: PipelineStage[] = [
        { $match: query },
        {
          $lookup: {
            from: 'zones',
            localField: 'id',
            foreignField: 'publisher',
            as: 'zones',
          },
        },
      ];

      Publisher.aggregate(pipeline)
        .then((res) => {
          if (res) console.log({ query }, 'Lists Publishers and Zones');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Retrieve a single publisher */
  retrieve(query: FilterQuery<IPublisher>): Promise<Partial<IPublisher> | null> {
    return new Promise((resolve, reject) => {
      Publisher.findOne(query)
        .lean()
        .exec()
        .then((res) => {
          if (res) console.log({ query }, 'Retrieves Publisher');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Create a publisher */
  create(doc: IPublisher): Promise<IPublisher> {
    return new Promise((resolve, reject) => {
      Publisher.create(doc)
        .then((res) => {
          if (res) console.log({ doc }, 'Creates Publisher');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Delete publishers */
  delete(query: FilterQuery<IPublisher>): Promise<number> {
    return new Promise((resolve, reject) => {
      Publisher.deleteMany(query)
        .then((res) => {
          if (res.deletedCount) console.log({ query }, 'Deletes Publisher');
          return resolve(res.deletedCount ?? 0);
        })
        .catch(reject);
    });
  },
};
