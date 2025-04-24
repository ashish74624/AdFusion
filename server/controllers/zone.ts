import Zone, { IZone } from '../models/zone';
import { FilterQuery } from 'mongoose';

/**
 * Zone service for handling zone-related operations with various CRUD functionalities and aggregation.
 */
export default {
  /** List zones */
  list(query: FilterQuery<IZone>): Promise<IZone[]> {
    return new Promise((resolve, reject) => {
      Zone.find(query)
        .lean()
        .exec()
        .then((res) => {
          if (res) console.log({ query }, 'Lists Zones');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** List zones along with their placements */
  listAndPlacements(query: FilterQuery<IZone>): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Zone.aggregate([
        { $match: query },
        {
          $lookup: {
            from: 'placements',
            localField: 'id',
            foreignField: 'zone.id',
            as: 'placements',
          },
        },
      ])
        .then((res) => {
          if (res) console.log({ query }, 'Lists Zones and its Placements');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Retrieve a single zone */
  retrieve(query: FilterQuery<IZone>): Promise<IZone | null> {
    return new Promise((resolve, reject) => {
      Zone.findOne(query)
        .lean()
        .exec()
        .then((res) => {
          if (res) console.log({ query }, 'Retrieves Zone');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Create a zone */
  create(query: IZone): Promise<IZone> {
    return new Promise((resolve, reject) => {
      Zone.create(query)
        .then((res) => {
          if (res) console.log({ query }, 'Creates Zone');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Delete a zone */
  delete(query: FilterQuery<IZone>): Promise<any> {
    return new Promise((resolve, reject) => {
      Zone.deleteMany(query)
        .then((res) => {
          if (res.deletedCount) console.log({ query }, 'Deletes Zone');
          return resolve(res);
        })
        .catch(reject);
    });
  },
};
