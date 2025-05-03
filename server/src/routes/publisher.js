import express from "express";

import Publisher from "./../controllers/publisher.js";
import Zone from "./../controllers/zone.js";
import Placement from "./../controllers/placement.js";
import Advertiser from "./../controllers/advertiser.js";

const router = express.Router();

router.get("/publisher/list", async(req, res, next) => {
  try {
    const publishersAndZones = await Publisher.listAndZones({ });
    const advertisersAndZones = await Advertiser.listAndCampaigns({ });

    return res.json( {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones
    });
  }catch(error) {
    return next(error);
  }
});

router.get("/publisher/view", async(req, res, next) => {
  try {
    const publishersAndZones = await Publisher.listAndZones({ });
    const advertisersAndZones = await Advertiser.listAndCampaigns({ });

    const publisherID = parseInt(req.query.publisher_id);
    const publisher = await Publisher.retrieve({ id: publisherID });
    const zones = await Zone.listAndPlacements({ publisher: publisherID });

  

    return res.json({ publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      publisher: publisher,
      zones: zones})
  }catch(error) {
    return next(error);
  }
});

router.post("/publisher/create", async(req, res) => {
  try {
    const { name, domain } = req.body;

    await Publisher.create({
      name: name,
      domain: domain
    });

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

router.post("/publisher/delete", async(req, res) => {
  try {
    const publisherIDs = req.body.ids;

    for (let i=0; i<publisherIDs.length; i+=1) {
      const publisherID = publisherIDs[i];
      
      // Find zones related to the publisher and delete it all
      const zones = await Zone.list({ publisher: publisherID });

      // Find placements related to the zone and delete it all
      for (let t=0; t<zones.length; t+=1) {
        const zoneID = zones[t].id;

        await Placement.delete({ "zone.id": zoneID });
        await Zone.delete({ id: zoneID });
      }

      // Delete a publisher
      console.log("here")
      await Publisher.delete({ id: publisherID });
    }

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

export default router;
