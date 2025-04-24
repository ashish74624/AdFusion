import mongoose, { Document, Schema } from "mongoose";
import MongooseSequence from "mongoose-sequence";

// Define the interface
export interface AdvertiserType extends Document {
    id: number;
    object: string;
    name: string;
}

// Initialize mongoose-sequence
const AutoIncrementFactory = MongooseSequence(mongoose);

// Define the schema
const schema = new Schema<AdvertiserType>({
    id: {
        type: Number,
        default: 0,
        unique: true,
        required: true,
    },
    object: {
        type: String,
        default: "advertiser",
        required: true,
    },
    name: {
        type: String,
        default: "",
        required: true,
    },
});

// Add auto-increment plugin
schema.plugin(AutoIncrementFactory, {
    id: "advertiser_id",
    inc_field: "id",
    collection_name: "ids",
});

export default mongoose.model<AdvertiserType>("advertiser", schema);
