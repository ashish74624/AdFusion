import React, { useState, useEffect } from "react";
import { Check, Code } from "lucide-react";
import { base_url } from "@/utils/baseUrl";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
    const [zoneTag, setZoneTag] = useState<string>("");

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

    useEffect(() => {
        // Get zone_id from URL
       

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
            const res =  await fetch(`${base_url}/placement/create`, {
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
            if(res.ok){
                toast.success("Assigment complete");
                fetchData();
            }
            // window.location.reload();
        } catch {
            toast.error("Error assigning campaign:")
        }
    };

    const handleDeleteSelectedCampaigns = async () => {
        if (selectedCampaigns.length === 0) return;

        const zoneId = new URLSearchParams(window.location.search).get("zone_id");

        try {
            const res = await fetch(`${base_url}/placement/delete`, {
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
            if(res.ok){
                toast.success("Delete success");
                fetchData();
            }
            // window.location.reload();
        } catch {
            toast.error("Error deleting campaign assignments:");
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
    const navigate = useNavigate();

    if (!data) {
        return <div className="p-4">Loading...</div>;
    }



    return (
        <>
            {/* Zone Header */}
            <h3 className="text-xl font-bold mb-4">
                {data.zone.name} ({data.zone.width}x{data.zone.height})
            </h3>

            {/* Get Zone Tags Button */}
            <div className="flex justify-end mb-6">
                <Modal>
                    <ModalTrigger>
                        <Button>
                            <span className="text-middle">Get Zone Tags</span>
                            <Code className="mr-2 h-5 w-5" />
                        </Button>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent>
                            <h2 className="text-xl font-bold mb-4">Zone Tags</h2>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="zone-tag-type-select">Type</label>
                                <div>
                                    <select
                                        id="zone-tag-type-select"
                                        className="border rounded px-3 py-2 w-full bg-[#0B0A0B]"
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
                        </ModalContent>
                    </ModalBody>
                </Modal>
            </div>



            {/* Assigned Campaigns Section */}
            <h4 className="text-lg font-bold mt-8 mb-4">Assigned Campaigns</h4>

            <div className="mb-4">
                <Modal>
                    <ModalTrigger>
                        <Button>
                            Assign New
                        </Button>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent>
                            <h4 className="text-lg font-bold mb-4">
                                Select a campaign to assign to "{data.zone.name}"
                            </h4>

                            <Table className="w-full border-collapse mb-4">
                                <TableHeader>
                                    <TableRow className="border-b">
                                        <TableCell></TableCell>
                                        <TableCell>Campaign</TableCell>
                                        <TableCell>Eligible Ad Items</TableCell>
                                        <TableCell>Advertiser</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.advertisers.flatMap(advertiser =>
                                        advertiser.campaigns.map(campaign => (
                                            <TableRow
                                                key={campaign.id}
                                                className="border-b cursor-pointer"
                                                onClick={() => handleCampaignAssign(campaign.id)}
                                            >
                                                <TableCell>
                                                    <Button className="border rounded p-1">
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    {campaign.name}
                                                </TableCell>
                                                <TableCell>{campaign.eligible_ad_items || 0}</TableCell>
                                                <TableCell>{advertiser.name}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                    {data.advertisers.flatMap(a => a.campaigns).length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="py-4 text-center">No Campaigns Found</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                        </ModalContent>
                    </ModalBody>
                </Modal>
               
            </div>


            {/* Assigned Campaigns Table */}
            <Table className="w-full border-collapse mb-4">
                <TableHeader>
                    <TableRow className="border-b">
                        <th className="py-2 text-left w-16"></th>
                        <th className="py-2 text-left">Name</th>
                        <th className="py-2 text-left">Total Impressions</th>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.assigned_campaigns.map(campaign => (
                        <TableRow key={`${campaign.id}-${campaign.name}`} className="border-b" data-campaign-id={campaign.id}>
                            <TableCell >
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={selectedCampaigns.includes(campaign.id)}
                                    onChange={() => toggleCampaignSelection(campaign.id)}
                                />
                            </TableCell>
                            <TableCell className="text-blue-500 hover:underline cursor-pointer " onClick={() => navigate(`/admin/advertiser/campaign/view?campaign_id=${campaign.id}`)}>
                                    {campaign.name}
                            </TableCell>
                            <TableCell>{campaign.total_impressions || 0}</TableCell>
                        </TableRow>
                    ))}
                    {data.assigned_campaigns.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="py-4 text-center">This zone has no assigned campaigns</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Remove Button */}
            <div>
                <Button
                    onClick={handleDeleteSelectedCampaigns}
                    disabled={selectedCampaigns.length === 0}
                    variant="destructive"
                >
                    Remove
                </Button>
            </div>
        </>
    );
};

export default ZoneManagement;