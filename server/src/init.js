import Publisher from "./controllers/publisher.js";
import Zone from "./controllers/zone.js";
import Advertiser from "./controllers/advertiser.js";
import Campaign from "./controllers/campaign.js";
import AdItem from "./controllers/adItem.js";
import CampaignAssignment from "./controllers/campaignAssignment.js";
import Placement from "./controllers/placement.js";

export default async() => {
  const publishers = await Publisher.list({ });
  const zones = await Zone.list({ });
  const advertisers = await Advertiser.list({ });
  const campaigns = await Campaign.list({ });
  const adItems = await AdItem.list({ });
  const campaignAssignments = await CampaignAssignment.list({ });
  const placements = await Placement.list({ });

  if (!publishers.length && !zones.length
    && !advertisers.length && !campaigns.length
    && !adItems.length && !campaignAssignments.length
    && !placements.length) {
    const publisher = await Publisher.create({ name: "Default Publisher" });
    const zone = await Zone.create({ name: "Default Zone", publisher: publisher.id });
    const advertiser = await Advertiser.create({ name: "Default Advertiser" });
    const campaign = await Campaign.create({ name: "Default Campaign", advertiser: advertiser.id });
    const adItem = await AdItem.create({
      name: "Default Ad Item",
      width: 300,
      height: 250,
      location: "https://github.com/ashish74624",
      creative_url: "https://image-get.vercel.app/ashishkumar74624@gmail.com/github/github.jpg",
      html_target: "_blank"
    });
    const campaignAssignment = await CampaignAssignment.create({
      advertisement: {
        id: adItem.id
      },
      campaign: {
        id: campaign.id
      }
    });
    const placement = await Placement.create({
      zone: {
        id: zone.id
      },
      advertisement: {
        id: campaign.id,
        type: campaign.object
      }
    });
  }
}
