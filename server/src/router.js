import express from "express";
import dashboardRoute from "./routes/dashboard.js";
import publisherRoute from "./routes/publisher.js";
import zoneRoute from "./routes/zone.js";
import advertiserRoute from "./routes/advertiser.js";
import campaignRoute from "./routes/campaign.js";
import adServeRoute from "./routes/adServe.js";
import placementRoute from "./routes/placement.js";
import adItemRoute from "./routes/adItem.js";

const router = express.Router();

router.use(dashboardRoute);
router.use(publisherRoute);
router.use(zoneRoute);
router.use(advertiserRoute);
router.use(campaignRoute);
router.use(adServeRoute);
router.use(placementRoute);
router.use(adItemRoute);

export default router;
