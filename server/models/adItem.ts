import mongoose, { Document, Schema } from "mongoose";
import MongooseSequence from "mongoose-sequence";

// Extend Mongoose plugin with types
const AutoIncrementFactory = MongooseSequence(mongoose);

// Interface for AdItem document
export interface AdItemType extends Document {
    id: number;
    object: string;
    name: string;
    width: number;
    height: number;
    location?: string;
    creative_url?: string;
    html_target?: string;
}

const schema = new Schema<AdItemType>({
    id: {
        type: Number,
        default: 0,
        unique: true,
        required: true
    },
    object: {
        type: String,
        default: "ad_item",
        required: true
    },
    name: {
        type: String,
        default: "",
        required: true
    },
    width: {
        type: Number,
        default: 300,
        required: true
    },
    height: {
        type: Number,
        default: 250,
        required: true
    },
    location: {
        type: String,
        default: ""
    },
    creative_url: {
        type: String,
        default: ""
    },
    html_target: {
        type: String,
        default: ""
    }
});

// Add auto-increment plugin
schema.plugin(AutoIncrementFactory, {
    id: "ad_item_id",
    inc_field: "id",
    collection_name: "ids"
});

export default mongoose.model<AdItemType>("ad_item", schema);
