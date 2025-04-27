import React, { useState, useEffect } from "react";
import { X, Plus, Check, Code } from "lucide-react";
import { base_url } from "@/utils/baseUrl";

// TypeScript interfaces
interface Zone {
    id: number;
    name: string;
    width: number;
    height: number;
    publisher: number;
}

interface Campaign {
    id: number;
    name: string;
    advertiser: number;
    total_impressions?: number;
    eligible_ad_items?: number;
}

interface ZoneViewResponse {
    publishers: Array<{
        id: number;
        name: string;
        domain: string;
        zones: Zone[];
    }>;
    advertisers: Array<{
        id: number;
        name: string;
        campaigns: Campaign[];
    }>;
    zone: Zone;
    assigned_campaigns: Campaign[];
}

const ZoneManagement: React.FC = () => {
    const [data, setData] = useState<ZoneViewResponse | null>(null);
    const [tagType, setTagType] = useState<string>("js");
    const [isZoneTagModalOpen, setIsZoneTagModalOpen] = useState<boolean>(false);
    const [isCampaignAssignModalOpen, setIsCampaignAssignModalOpen] = useState<boolean>(false);
    const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
    const [zoneTag, setZoneTag] = useState<string>("");

    useEffect(() => {
        // Get zone_id from URL
        const urlParams = new URLSearchParams(window.location.search);
        const zoneId = urlParams.get("zone_id");

        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await fetch(`${base_url}/zone/view?zone_id=${zoneId}`);
                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                console.error("Error fetching zone data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            updateZoneTag();
        }
    }, [tagType, data]);

    const updateZoneTag = () => {
        if (!data) return;

        const zoneId = new URLSearchParams(window.location.search).get("zone_id");
        const host = `http://${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}`;

        let tag = "";
        switch (tagType) {
            case "js":
                tag = `<script type="text/javascript">\n` +
                    `var absrc = "${host}/adserve?zone_id=${zoneId}&type=js";\n` +
                    `document.write("<scr"+"ipt src="+absrc+" type='text/javascript'></scr"+"ipt>");\n` +
                    `</script>`;
                break;
            case "iframe":
                tag = `<iframe src="${host}/adserve?zone_id=${zoneId}&type=iframe"` +
                    ` width="${data.zone.width}" height="${data.zone.height}" marginwidth="0" marginheight="0"` +
                    ` hspace="0" vspace="0" frameborder="0" scrolling="no">` +
                    `</iframe>`;
                break;
            case "json":
                tag = `${host}/adserve?zone_id=${zoneId}&type=json`;
                break;
        }

        setZoneTag(tag);
    };

    const handleCampaignAssign = async (campaignId: number) => {
        const zoneId = new URLSearchParams(window.location.search).get("zone_id");

        try {
            await fetch("/placement/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    zone_id: zoneId,
                    campaign_id: campaignId
                }),
            });

            // Reload page to show updated data
            window.location.reload();
        } catch (error) {
            console.error("Error assigning campaign:", error);
        }
    };

    const handleDeleteSelectedCampaigns = async () => {
        if (selectedCampaigns.length === 0) return;

        const zoneId = new URLSearchParams(window.location.search).get("zone_id");

        try {
            await fetch("/placement/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    zone_id: zoneId,
                    ids: selectedCampaigns
                }),
            });

            // Reload page to show updated data
            window.location.reload();
        } catch (error) {
            console.error("Error deleting campaign assignments:", error);
        }
    };

    const toggleCampaignSelection = (campaignId: number) => {
        setSelectedCampaigns(prevSelected => {
            if (prevSelected.includes(campaignId)) {
                return prevSelected.filter(id => id !== campaignId);
            } else {
                return [...prevSelected, campaignId];
            }
        });
    };

    if (!data) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4">
            {/* Zone Header */}
            <h3 className="text-xl font-bold mb-4">
                {data.zone.name} ({data.zone.width}x{data.zone.height})
            </h3>

            {/* Get Zone Tags Button */}
            <div className="flex justify-end mb-6">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                    onClick={() => setIsZoneTagModalOpen(true)}
                >
                    <Code className="mr-2 h-5 w-5" />
                    <span className="text-middle">Get Zone Tags</span>
                </button>
            </div>

            {/* Zone Tag Modal */}
            {isZoneTagModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">Zone Tags</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="zone-tag-type-select">Type</label>
                            <div>
                                <select
                                    id="zone-tag-type-select"
                                    className="border rounded px-3 py-2 w-full"
                                    value={tagType}
                                    onChange={(e) => setTagType(e.target.value)}
                                >
                                    <option value="js">JavaScript</option>
                                    <option value="iframe">IFrame</option>
                                    <option value="json">JSON Ad API</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <textarea
                                className="border rounded px-3 py-2 w-full h-40"
                                value={zoneTag}
                                readOnly
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                                onClick={() => setIsZoneTagModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Assigned Campaigns Section */}
            <h4 className="text-lg font-bold mt-8 mb-4">Assigned Campaigns</h4>

            <div className="mb-4">
                <button
                    className="border rounded px-4 py-2 flex items-center hover:bg-gray-100"
                    onClick={() => setIsCampaignAssignModalOpen(true)}
                >
                    <Plus className="mr-2 h-5 w-5" />
                    <span>Assign New</span>
                </button>
            </div>

            {/* Campaign Assign Modal */}
            {isCampaignAssignModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
                        <h4 className="text-lg font-bold mb-4">
                            Select a campaign to assign to "{data.zone.name}"
                        </h4>

                        <table className="w-full border-collapse mb-4">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 text-left w-16"></th>
                                    <th className="py-2 text-left">Campaign</th>
                                    <th className="py-2 text-left">Eligible Ad Items</th>
                                    <th className="py-2 text-left">Advertiser</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.advertisers.flatMap(advertiser =>
                                    advertiser.campaigns.map(campaign => (
                                        <tr
                                            key={campaign.id}
                                            className="border-b hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleCampaignAssign(campaign.id)}
                                        >
                                            <td className="py-2">
                                                <button className="border rounded p-1">
                                                    <Check className="h-4 w-4" />
                                                </button>
                                            </td>
                                            <td className="py-2 whitespace-nowrap">{campaign.name}</td>
                                            <td className="py-2 whitespace-nowrap">{campaign.eligible_ad_items || 0}</td>
                                            <td className="py-2 whitespace-nowrap">{advertiser.name}</td>
                                        </tr>
                                    ))
                                )}
                                {data.advertisers.flatMap(a => a.campaigns).length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-4 text-center">No Campaigns Found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="flex justify-end">
                            <button
                                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                                onClick={() => setIsCampaignAssignModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Assigned Campaigns Table */}
            <table className="w-full border-collapse mb-4">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 text-left w-16"></th>
                        <th className="py-2 text-left">Name</th>
                        <th className="py-2 text-left">Total Impressions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.assigned_campaigns.map(campaign => (
                        <tr key={`${campaign.id}-${campaign.name}`} className="border-b" data-campaign-id={campaign.id}>
                            <td className="py-2">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={selectedCampaigns.includes(campaign.id)}
                                    onChange={() => toggleCampaignSelection(campaign.id)}
                                />
                            </td>
                            <td className="py-2 whitespace-nowrap">{campaign.name}</td>
                            <td className="py-2 whitespace-nowrap">{campaign.total_impressions || 0}</td>
                        </tr>
                    ))}
                    {data.assigned_campaigns.length === 0 && (
                        <tr>
                            <td colSpan={3} className="py-4 text-center">This zone has no assigned campaigns</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Remove Button */}
            <div>
                <button
                    className="border rounded px-4 py-2 flex items-center hover:bg-gray-100 disabled:opacity-50"
                    onClick={handleDeleteSelectedCampaigns}
                    disabled={selectedCampaigns.length === 0}
                >
                    <X className="mr-2 h-5 w-5" />
                    <span>Remove</span>
                </button>
            </div>
        </div>
    );
};

export default ZoneManagement;