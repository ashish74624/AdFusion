import express from "express";

import Report from "./../controllers/report.js";
import Publisher from "./../controllers/publisher.js";
import Advertiser from "./../controllers/advertiser.js";

const router = express.Router();

router.get("/", async(req, res, next) => {
  try {
    const reports = await Report.overview();
    const publishersAndZones = await Publisher.listAndZones({ });
    const advertisersAndZones = await Advertiser.listAndCampaigns({ });

    return res.render("dashboard", {
      reports: JSON.stringify(reports),
      publishers: publishersAndZones,
      advertisers: advertisersAndZones
    });
  }catch(error) {
    return next(error);
  }
});

export default router;
