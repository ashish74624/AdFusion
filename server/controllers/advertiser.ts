import { FilterQuery, PipelineStage } from 'mongoose';
import Advertiser, { AdvertiserType } from "./../models/advertiser";

/**
 * Advertiser service using explicit Promise wrappers (kept for parity with original JS).
 */
export default {
  /** List advertisers matching a query */
  list(query: FilterQuery<AdvertiserType>): Promise<Partial<AdvertiserType>[]> {
    return new Promise((resolve, reject) => {
      Advertiser.find(query)
        .lean()
        .exec()
        .then((res) => {
          if (res) console.log({ query }, 'Lists Advertisers');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** List advertisers along with their campaigns */
  listAndCampaigns(query: FilterQuery<AdvertiserType>): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const pipeline: PipelineStage[] = [
        { $match: query },
        {
          $lookup: {
            from: 'campaigns',
            localField: 'id',
            foreignField: 'advertiser',
            as: 'campaigns',
          },
        },
      ];

      Advertiser.aggregate(pipeline)
        .then((res) => {
          if (res) console.log({ query }, 'Lists Advertisers and Campaigns');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Retrieve a single advertiser */
  retrieve(query: FilterQuery<AdvertiserType>): Promise<Partial<AdvertiserType> | null> {
    return new Promise((resolve, reject) => {
      Advertiser.findOne(query)
        .lean()
        .exec()
        .then((res) => {
          if (res) console.log({ query }, 'Retrieves Advertiser');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Create an advertiser document */
  create(doc: AdvertiserType): Promise<AdvertiserType> {
    return new Promise((resolve, reject) => {
      Advertiser.create(doc)
        .then((res) => {
          if (res) console.log({ doc }, 'Creates Advertiser');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Delete advertiser(s) matching a query */
  delete(query: FilterQuery<AdvertiserType>): Promise<number> {
    return new Promise((resolve, reject) => {
      Advertiser.deleteMany(query)
        .then((res) => {
          if (res.deletedCount) console.log({ query }, 'Deletes Advertiser');
          return resolve(res.deletedCount ?? 0);
        })
        .catch(reject);
    });
  },
};
