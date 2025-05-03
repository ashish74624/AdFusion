"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handlebars = require("handlebars");

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  _handlebars2.default.registerHelper("publishersAndZones", function (publishers) {
    var navHtml = "<ul class='uk-nav-sub'>";

    for (var i = 0; i < publishers.length; i += 1) {
      var publisher = publishers[i];

      navHtml += "<li>";
      navHtml += "  <a href='/publisher/view?publisher_id=" + publisher.id + "'> " + publisher.name + " </a>";

      var subNavHtml = "<ul class='uk-nav-sub'>";
      for (var t = 0; t < publisher.zones.length; t += 1) {
        var zone = publisher.zones[t];

        subNavHtml += "<li>";
        subNavHtml += "  <a href='/zone/view?zone_id=" + zone.id + "'>";
        subNavHtml += "    <span uk-icon='move' class='uk-icon'></span>";
        subNavHtml += "    <span class='uk-text-middle'> " + zone.name + " </span>";
        subNavHtml += "  </a>";
        subNavHtml += "</li>";
      }
      subNavHtml += "</ul>";

      navHtml += subNavHtml;
      navHtml += "</li>";
    }

    navHtml += "</ul>";

    return new _handlebars2.default.SafeString(navHtml);
  });

  _handlebars2.default.registerHelper("publisherList", function (publishers) {
    var html = "";

    for (var i = 0; i < publishers.length; i += 1) {
      var publisher = publishers[i];

      html += "<tr data-publisher-id=" + publisher.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + publisher.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + publisher.zones.length + " </td>";
      html += "</tr>";
    }

    if (!publishers.length) {
      html += "<tr>";
      html += "  <td colspan='3' class='uk-text-center'> This administrator has no publishers </td>";
      html += "</tr>";
    }

    return new _handlebars2.default.SafeString(html);
  });

  _handlebars2.default.registerHelper("zoneList", function (zones) {
    var html = "";

    for (var i = 0; i < zones.length; i += 1) {
      var zone = zones[i];

      html += "<tr data-zone-id=" + zone.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + zone.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + (zone.width + "x" + zone.height) + " </td>";
      html += "  <td class='uk-text-nowrap'> " + zone.placements.length + " </td>";
      html += "</tr>";
    }

    if (!zones.length) {
      html += "<tr>";
      html += "  <td colspan='4' class='uk-text-center'> This publisher has no zones </td>";
      html += "</tr>";
    }

    return new _handlebars2.default.SafeString(html);
  });

  _handlebars2.default.registerHelper("assignedCampaignList", function (assignedCampaigns) {
    var html = "";

    for (var i = 0; i < assignedCampaigns.length; i += 1) {
      var assignedCampaign = assignedCampaigns[i];

      html += "<tr data-campaign-id=" + assignedCampaign.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + assignedCampaign.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + assignedCampaign.total_impressions + " </td>";
      html += "</tr>";
    }

    if (!assignedCampaigns.length) {
      html += "<tr>";
      html += "  <td colspan='3' class='uk-text-center'> This zone has no assigned campaigns </td>";
      html += "</tr>";
    }

    return new _handlebars2.default.SafeString(html);
  });

  _handlebars2.default.registerHelper("advertisersAndCampaigns", function (advertisers) {
    var navHtml = "<ul class='uk-nav-sub'>";

    for (var i = 0; i < advertisers.length; i += 1) {
      var advertiser = advertisers[i];

      navHtml += "<li>";
      navHtml += "  <a href='/advertiser/view?advertiser_id=" + advertiser.id + "'> " + advertiser.name + " </a>";

      var subNavHtml = "<ul class='uk-nav-sub'>";
      for (var t = 0; t < advertiser.campaigns.length; t += 1) {
        var campaign = advertiser.campaigns[t];

        subNavHtml += "<li>";
        subNavHtml += "  <a href='/campaign/view?campaign_id=" + campaign.id + "'>";
        subNavHtml += "    <span uk-icon='image' class='uk-icon'></span>";
        subNavHtml += "    <span class='uk-text-middle'> " + campaign.name + " </span>";
        subNavHtml += "  </a>";
        subNavHtml += "</li>";
      }
      subNavHtml += "</ul>";

      navHtml += subNavHtml;
      navHtml += "</li>";
    }

    navHtml += "</ul>";

    return new _handlebars2.default.SafeString(navHtml);
  });

  _handlebars2.default.registerHelper("advertiserList", function (advertisers) {
    var html = "";

    for (var i = 0; i < advertisers.length; i += 1) {
      var advertiser = advertisers[i];

      html += "<tr data-advertiser-id=" + advertiser.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + advertiser.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + advertiser.campaigns.length + " </td>";
      html += "</tr>";
    }

    if (!advertisers.length) {
      html += "<tr>";
      html += "  <td colspan='3' class='uk-text-center'> This administrator has no advertisers </td>";
      html += "</tr>";
    }

    return new _handlebars2.default.SafeString(html);
  });

  _handlebars2.default.registerHelper("campaignList", function (campaigns) {
    var html = "";

    for (var i = 0; i < campaigns.length; i += 1) {
      var campaign = campaigns[i];

      html += "<tr data-campaign-id=" + campaign.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + campaign.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + campaign.campaign_assignments.length + " </td>";
      html += "  <td class='uk-text-nowrap'> " + campaign.placements.length + " </td>";
      html += "</tr>";
    }

    if (!campaigns.length) {
      html += "<tr>";
      html += "  <td colspan='4' class='uk-text-center'> This advertiser has no campaigns </td>";
      html += "</tr>";
    }

    return new _handlebars2.default.SafeString(html);
  });

  _handlebars2.default.registerHelper("adItemList", function (adItems) {
    var html = "";

    for (var i = 0; i < adItems.length; i += 1) {
      var adItem = adItems[i];

      html += "<tr data-ad-item-id=" + adItem.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + adItem.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + adItem.total_impressions + " </td>";
      html += "  <td class='uk-text-nowrap'> " + adItem.clicks + " </td>";
      html += "</tr>";
    }

    if (!adItems.length) {
      html += "<tr>";
      html += "  <td colspan='4' class='uk-text-center'> This campaign has no ad items </td>";
      html += "</tr>";
    }

    return new _handlebars2.default.SafeString(html);
  });

  _handlebars2.default.registerHelper("zoneAssignmentList", function (zones) {
    var html = "";

    for (var i = 0; i < zones.length; i += 1) {
      var zone = zones[i];

      html += "<tr data-zone-id=" + zone.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + zone.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + zone.total_impressions + " </td>";
      html += "</tr>";
    }

    if (!zones.length) {
      html += "<tr>";
      html += "  <td colspan='3' class='uk-text-center'> This campaign has no zone assignments </td>";
      html += "</tr>";
    }

    return new _handlebars2.default.SafeString(html);
  });
};
//# sourceMappingURL=handlebars.js.map