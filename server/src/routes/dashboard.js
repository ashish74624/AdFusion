import express from "express";

import Report from "./../controllers/report.js";
import Publisher from "./../controllers/publisher.js";
import Advertiser from "./../controllers/advertiser.js";

const router = express.Router();

router.get("/", async(req, res, next) => {
  try {
    const reports = await Report.overview();
    console.log(reports);
    const publishersAndZones = await Publisher.listAndZones({ });
    const advertisersAndZones = await Advertiser.listAndCampaigns({ });

    return res.json({ reports:JSON.stringify(reports), publishersAndZones:publishersAndZones , advertisersAndZones:advertisersAndZones})
  }catch(error) {
    return next(error);
  }
});

export default router;
