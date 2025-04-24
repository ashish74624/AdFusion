import mongoose, { Document, Schema } from 'mongoose';
import MongooseSequence from 'mongoose-sequence';

/**
 * Interface representing a Publisher document in MongoDB.
 */
export interface IPublisher extends Document {
  id: number;
  object: 'publisher';
  name: string;
  domain?: string;
}

// initialise the sequence plugin with the current mongoose instance
const AutoIncrement = MongooseSequence(mongoose);

const PublisherSchema: Schema<IPublisher> = new Schema<IPublisher>(
  {
    id: {
      type: Number,
      default: 0,
      unique: true,
      required: true,
    },
    object: {
      type: String,
      default: 'publisher',
      required: true,
      enum: ['publisher'], // restrict values to literal string
    },
    name: {
      type: String,
      default: '',
      required: true,
      trim: true,
    },
    domain: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt fields
  }
);

// add auto‑incrementing unique id
PublisherSchema.plugin(AutoIncrement, {
  id: 'publisher_id',
  inc_field: 'id',
  collection_name: 'ids',
});

export default mongoose.model<IPublisher>('Publisher', PublisherSchema);
