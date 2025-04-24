import moment from 'moment';
import { FilterQuery } from 'mongoose';
import Report, { IReport } from '../models/report';

/**
 * Report service for handling reports with various CRUD operations and aggregation.
 */
export default {
  /** List reports */
  list(query: FilterQuery<IReport>): Promise<IReport[]> {
    return new Promise((resolve, reject) => {
      Report.find(query)
        .then((res) => {
          if (res) console.log({ query }, 'Lists Reports');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Retrieve a single report */
  retrieve(query: FilterQuery<IReport>): Promise<IReport | null> {
    return new Promise((resolve, reject) => {
      Report.findOne(query)
        .then((res) => {
          if (res) console.log({ query }, 'Retrieves Report');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Create a report */
  create(query: IReport): Promise<IReport> {
    return new Promise((resolve, reject) => {
      Report.create(query)
        .then((res) => {
          if (res) console.log({ query }, 'Creates Report');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Update a report */
  update(query: FilterQuery<IReport>, document: Partial<IReport>): Promise<IReport | null> {
    return new Promise((resolve, reject) => {
      Report.findOneAndUpdate(query, document)
        .then((res) => {
          if (res) console.log({ query }, 'Updates Report');
          return resolve(res);
        })
        .catch(reject);
    });
  },

  /** Get an overview of reports for the last 7 days */
  overview(): Promise<{ labels: string[], impressions: number[], clicks: number[] }> {
    return new Promise((resolve, reject) => {
      const query = {
        date: {
          $gte: moment().subtract(6, 'd').format('YYYY-MM-DD'),
          $lte: moment().format('YYYY-MM-DD'),
        },
      };

      Report.aggregate([
        { $match: query },
        {
          $project: {
            impressions: '$impressions',
            clicks: '$clicks',
            date: { $substr: ['$date', 5, 9] },
          },
        },
        {
          $group: {
            _id: { date: '$date' },
            date: { $first: '$date' },
            impressions: { $sum: '$impressions' },
            clicks: { $sum: '$clicks' },
          },
        },
      ])
        .then((reports) => {
          const dateRanges:any[] = [];
          const impressions:any[] = [];
          const clicks:any[] = [];

          for (let i = 6; i >= 0; i -= 1) {
            dateRanges.push(moment().add(-i, 'day').format('MM-DD'));
          }

          for (let i = 0; i < dateRanges.length; i += 1) {
            const dateRange = dateRanges[i];

            for (let t = 0; t < reports.length; t += 1) {
              const report = reports[t];

              if (dateRange === report.date) {
                impressions.push(report.impressions);
                clicks.push(report.clicks);
                break;
              } else if (t + 1 === reports.length) {
                impressions.push(0);
                clicks.push(0);
              }
            }
          }

          if (!reports.length) {
            for (let i = 0; i < dateRanges.length; i += 1) {
              impressions.push(0);
              clicks.push(0);
            }
          }

          return resolve({
            labels: dateRanges,
            impressions: impressions,
            clicks: clicks,
          });
        })
        .catch(reject);
    });
  },
};
