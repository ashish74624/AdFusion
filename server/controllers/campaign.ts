import { FilterQuery, PipelineStage } from 'mongoose';
import Campaign, { CampaignType } from '../models/campaign';

/**
 * Campaign service mirroring original Promise‑based API.
 */
export default {
  /** List campaigns */
  list(query: FilterQuery<CampaignType>): Promise<Partial<CampaignType>[]> {
    return new Promise((resolve, reject) => {
      Campaign.find(query)
        .lean()
        .exec()
        .then((res) => {
          if (res) console.log({ query }, 'Lists Campaigns');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** List campaigns with their assignments and placements */
  listAndCampaignAssignments(query: FilterQuery<CampaignType>): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const pipeline: PipelineStage[] = [
        { $match: query },
        {
          $lookup: {
            from: 'campaign_assignments',
            localField: 'id',
            foreignField: 'campaign.id',
            as: 'campaign_assignments',
          },
        },
        {
          $lookup: {
            from: 'placements',
            localField: 'id',
            foreignField: 'advertisement.id',
            as: 'placements',
          },
        },
      ];

      Campaign.aggregate(pipeline)
        .then((res) => {
          if (res) console.log({ query }, 'Lists Campaigns and Its Assignments');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Retrieve a single campaign */
  retrieve(query: FilterQuery<CampaignType>): Promise<Partial<CampaignType> | null> {
    return new Promise((resolve, reject) => {
      Campaign.findOne(query)
        .lean()
        .exec()
        .then((res) => {
          if (res) console.log({ query }, 'Retrieves Campaign');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Create a campaign */
  create(doc: CampaignType): Promise<CampaignType> {
    return new Promise((resolve, reject) => {
      Campaign.create(doc)
        .then((res) => {
          if (res) console.log({ doc }, 'Creates Campaign');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Delete campaign(s) */
  delete(query: FilterQuery<CampaignType>): Promise<number> {
    return new Promise((resolve, reject) => {
      Campaign.deleteMany(query)
        .then((res) => {
          if (res.deletedCount) console.log({ query }, 'Deletes Campaign');
          return resolve(res.deletedCount ?? 0);
        })
        .catch(reject);
    });
  },
};
