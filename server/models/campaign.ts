import mongoose, { Document, Schema } from "mongoose";
import MongooseSequence from "mongoose-sequence";

// Define TypeScript interface for Campaign
export interface CampaignType extends Document {
  id: number;
  object: string;
  name: string;
  advertiser: number;
}

// Initialize mongoose-sequence
const AutoIncrementFactory = MongooseSequence(mongoose);

// Define schema
const schema = new Schema<CampaignType>({
  id: {
    type: Number,
    default: 0,
    unique: true,
    required: true
  },
  object: {
    type: String,
    default: "campaign",
    required: true
  },
  name: {
    type: String,
    default: "",
    required: true
  },
  advertiser: {
    type: Number,
    default: 0,
    required: true
  }
});

// Add auto-increment plugin
schema.plugin(AutoIncrementFactory, {
  id: "campaign_id",
  inc_field: "id",
  collection_name: "ids"
});

export default mongoose.model<CampaignType>("campaign", schema);
