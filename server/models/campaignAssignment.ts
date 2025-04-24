import mongoose, { Document, Schema } from "mongoose";
import MongooseSequence from "mongoose-sequence";

// Define the interface
export interface CampaignAssignmentType extends Document {
  id: number;
  object: string;
  advertisement: {
    id: number;
  };
  campaign: {
    id: number;
  };
}

// Initialize mongoose-sequence
const AutoIncrementFactory = MongooseSequence(mongoose);

// Define schema
const schema = new Schema<CampaignAssignmentType>({
  id: {
    type: Number,
    default: 0,
    unique: true,
    required: true
  },
  object: {
    type: String,
    default: "campaign_assignment",
    required: true
  },
  advertisement: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  campaign: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  }
});

// Add auto-increment plugin
schema.plugin(AutoIncrementFactory, {
  id: "campaign_assignment_id",
  inc_field: "id",
  collection_name: "ids"
});

export default mongoose.model<CampaignAssignmentType>("campaign_assignment", schema);
