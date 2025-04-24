import mongoose, { Document, Schema } from "mongoose";
import MongooseSequence from "mongoose-sequence";

// TypeScript interface for Placement
export interface PlacementType extends Document {
  id: number;
  object: string;
  zone: {
    id: number;
  };
  advertisement: {
    id: number;
    type: string;
  };
}

// Initialize mongoose-sequence
const AutoIncrementFactory = MongooseSequence(mongoose);

// Define schema
const schema = new Schema<PlacementType>({
  id: {
    type: Number,
    default: 0,
    unique: true,
    required: true,
  },
  object: {
    type: String,
    default: "placement",
    required: true,
  },
  zone: {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  advertisement: {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
    type: {
      type: String,
      default: "",
    },
  },
});

// Add auto-increment plugin
schema.plugin(AutoIncrementFactory, {
  id: "placement_id",
  inc_field: "id",
  collection_name: "ids",
});

export default mongoose.model<PlacementType>("placement", schema);
