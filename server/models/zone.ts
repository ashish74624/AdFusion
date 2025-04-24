import mongoose, { Document, Schema } from 'mongoose';
import MongooseSequence from 'mongoose-sequence';

/**
 * Interface representing a Zone document in MongoDB.
 */
export interface IZone extends Document {
  id: number;
  object: 'zone';
  name: string;
  width: number;
  height: number;
  publisher: number;
}

const AutoIncrement = MongooseSequence(mongoose);

const ZoneSchema: Schema<IZone> = new Schema<IZone>(
  {
    id: {
      type: Number,
      default: 0,
      unique: true,
      required: true,
    },
    object: {
      type: String,
      default: 'zone',
      enum: ['zone'],
      required: true,
    },
    name: {
      type: String,
      default: '',
      required: true,
      trim: true,
    },
    width: {
      type: Number,
      default: 300,
      required: true,
      min: 1,
    },
    height: {
      type: Number,
      default: 250,
      required: true,
      min: 1,
    },
    publisher: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add auto‑incrementing unique id
ZoneSchema.plugin(AutoIncrement, {
  id: 'zone_id',
  inc_field: 'id',
  collection_name: 'ids',
});

export default mongoose.model<IZone>('Zone', ZoneSchema);
