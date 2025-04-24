import { FilterQuery } from 'mongoose';
import Placement, { PlacementType } from '../models/placement';

/**
 * Placement service replicating original Promise‑based structure with TypeScript types.
 */
export default {
  /** List placements */
  list(query: FilterQuery<PlacementType>): Promise<Partial<PlacementType>[]> {
    return new Promise((resolve, reject) => {
      Placement.find(query)
        .lean()
        .exec()
        .then((res) => {
          if (res) console.log({ query }, 'Lists Placements');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Create a placement */
  create(doc: PlacementType): Promise<PlacementType> {
    return new Promise((resolve, reject) => {
      Placement.create(doc)
        .then((res) => {
          if (res) console.log({ doc }, 'Creates Placement');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Delete placements */
  delete(query: FilterQuery<PlacementType>): Promise<number> {
    return new Promise((resolve, reject) => {
      Placement.deleteMany(query)
        .then((res) => {
          if (res.deletedCount) console.log({ query }, 'Deletes Placement');
          return resolve(res.deletedCount ?? 0);
        })
        .catch(reject);
    });
  },
};
