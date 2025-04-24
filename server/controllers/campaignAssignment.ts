import { FilterQuery } from 'mongoose';
import CampaignAssignment, { CampaignAssignmentType } from '../models/campaignAssignment';

/**
 * CampaignAssignment service preserving Promise‑based interface.
 */
export default {
  /** List campaign assignments */
  list(query: FilterQuery<CampaignAssignmentType>): Promise<CampaignAssignmentType[]> {
    return new Promise((resolve, reject) => {
      CampaignAssignment.find(query)
        .then((res) => {
          if (res) console.log({ query }, 'Lists CampaignAssignments');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Create a campaign assignment */
  create(doc: CampaignAssignmentType): Promise<CampaignAssignmentType> {
    return new Promise((resolve, reject) => {
      CampaignAssignment.create(doc)
        .then((res) => {
          if (res) console.log({ doc }, 'Creates CampaignAssignment');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Delete campaign assignments */
  delete(query: FilterQuery<CampaignAssignmentType>): Promise<number> {
    return new Promise((resolve, reject) => {
      CampaignAssignment.deleteMany(query)
        .then((res) => {
          if (res.deletedCount) console.log({ query }, 'Deletes CampaignAssignment');
          return resolve(res.deletedCount ?? 0);
        })
        .catch(reject);
    });
  },
};
