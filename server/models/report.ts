import mongoose, { Document, Schema } from 'mongoose';
import MongooseSequence from 'mongoose-sequence';

/**
 * Interface representing nested reference objects (ad_item, campaign, zone)
 */
interface EntityRef {
  type: 'ad_item' | 'campaign' | 'zone';
  id: number;
}

/**
 * Interface representing a Report document in MongoDB.
 */
export interface IReport extends Document {
  placement: number;
  ad_item: EntityRef;
  campaign: EntityRef;
  zone: EntityRef;
  impressions: number;
  clicks: number;
  date: string; // consider Date if possible
}

const ReportSchema: Schema<IReport> = new Schema<IReport>(
  {
    placement: {
      type: Number,
      default: 0,
      required: true,
    },
    ad_item: {
      type: {
        type: String,
        default: 'ad_item',
        enum: ['ad_item'],
        required: true,
      },
      id: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    campaign: {
      type: {
        type: String,
        default: 'campaign',
        enum: ['campaign'],
        required: true,
      },
      id: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    zone: {
      type: {
        type: String,
        default: 'zone',
        enum: ['zone'],
        required: true,
      },
      id: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    impressions: {
      type: Number,
      default: 0,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
      required: true,
    },
    date: {
      type: String,
      default: '',
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// initialize sequence plugin (optional: per‑report auto‑increment)
const AutoIncrement = MongooseSequence(mongoose);

// Example: if you need an auto‑inc report id, uncomment below
// ReportSchema.plugin(AutoIncrement, {
//   id: 'report_id',
//   inc_field: 'placement', // change if needed
//   collection_name: 'ids',
// });

export default mongoose.model<IReport>('Report', ReportSchema);
