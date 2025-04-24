import AdItem from "../models/adItem";
import { FilterQuery, Document } from "mongoose";

interface AdItemType extends Document {
    name: string;
    width: number;
    height: number;
    location: string;
    creative_url: string;
    html_target: string;
    // Add more fields if needed
}

export default {
    list: async (query: FilterQuery<AdItemType>): Promise<AdItemType[]> => {
        try {
            const res:any = await AdItem.find(query);
            if (res) console.log({ query }, "Lists AdItems");
            return res;
        } catch (error) {
            throw error;
        }
    },

    retrieve: async (query: FilterQuery<AdItemType>): Promise<AdItemType | null> => {
        try {
            const res = await AdItem.findOne(query).lean().exec();
            if (res) console.log({ query }, "Retrieves AdItem");
            return res as AdItemType;
        } catch (error) {
            throw error;
        }
    },

    create: async (query: Partial<AdItemType>): Promise<AdItemType> => {
        try {
            const res :any= await AdItem.create(query);
            if (res) console.log({ query }, "Creates AdItem");
            return res;
        } catch (error) {
            throw error;
        }
    },

    delete: async (query: FilterQuery<AdItemType>): Promise<any> => {
        try {
            const res = await AdItem.deleteMany(query);
            if (res.deletedCount) console.log({ query }, "Deletes AdItem");
            return res;
        } catch (error) {
            throw error;
        }
    }
};
