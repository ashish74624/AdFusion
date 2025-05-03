// components/AdvertiserView.tsx

import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { base_url } from "@/utils/baseUrl";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

type CampaignAssignment = {
    id: number;
    advertisement: {
        id: number;
    };
    campaign: {
        id: number;
    };
};

type Placement = {
    id: number;
    zone: {
        id: number;
    };
    advertisement: {
        id: number;
        type: string;
    };
};

type Campaign = {
    id: number;
    name: string;
    campaign_assignments?: CampaignAssignment[];
    placements?: Placement[];
};

type Advertiser = {
    id: number;
    name: string;
};


const AdvertiserView = () => {
    const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [newCampaignName, setNewCampaignName] = useState("");
    const [searchParams] = useSearchParams();
    const [campaignList, setCampaignList] = useState<number[]>([]);
    const advertiser_id = searchParams.get("advertiser_id");

    const fetchAdvertiserData = async () => {
        try {
            const response = await fetch(`${base_url}/advertiser/view?advertiser_id=${advertiser_id}`);
            const data = await response.json();
            setAdvertiser(data.advertiser);
            setCampaigns(data.campaigns);
        } catch {
            toast.error("Error fetching advertiser data:");
        }
    };
    useEffect(() => {


        fetchAdvertiserData();
    }, [searchParams, advertiser_id]);

    const handleCreateCampaign = async () => {
        try {
            const res = await fetch(`${base_url}/campaign/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    advertiser_id: advertiser_id,
                    name: newCampaignName
                })
            })

            if (res.ok) {
                fetchAdvertiserData();
                toast.success("New campaign created");
            }
        } catch {
            toast.error("Failed to create new campaign");
        }
    };


    function toggleCampaignSelection(cid: number): void {
        if (campaignList.includes(cid)) {
            setCampaignList(campaignList.filter(id => id !== cid));
        } else {
            setCampaignList([...campaignList, cid]);
        }
    }

    const handleDeleteCampaigns = async () => {
        try {
            const res = await fetch(`${base_url}/campaign/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ids: campaignList
                })
            })

            if (res.ok) {
                toast.success("Delete Success");
                fetchAdvertiserData();
            }
        } catch {
            toast.error("Delete failed");
        }
    }

    const navigate = useNavigate();


    return (
        <>
            <h3 className="text-2xl font-bold mb-4">{advertiser?.name}</h3>

            <div className="flex justify-between">
                <h4 className="text-xl font-semibold mb-4">Campaigns</h4>
                <Modal>
                    <ModalTrigger>
                        <Button>
                            Add New
                        </Button>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent className="h-max">
                            <h2 className="text-xl font-bold mb-4">New Campaign</h2>

                            <div className="mb-4">
                                <label className="block font-medium mb-2" htmlFor="campaign-name-input">
                                    Name
                                </label>
                                <input
                                    id="campaign-name-input"
                                    type="text"
                                    value={newCampaignName}
                                    onChange={(e) => setNewCampaignName(e.target.value)}
                                    placeholder="Enter campaign name"
                                    className="w-full border border-gray-300 rounded p-2"
                                />
                            </div>
                        </ModalContent>
                        <ModalFooter className="gap-4">
                            <Button onClick={handleCreateCampaign}>
                                Create
                            </Button>
                        </ModalFooter>
                    </ModalBody>
                </Modal>
            </div>


            <div className="overflow-x-auto mb-6">
                <Table className="min-w-full border-collapse">
                    <TableHeader>
                        <TableRow>
                            <TableHead ></TableHead>
                            <TableHead >Name</TableHead>
                            <TableHead >Ads</TableHead>
                            <TableHead >Included In Zones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaigns.map((campaign) => (
                            <TableRow key={campaign.id} >
                                <TableCell  >
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={campaignList.includes(campaign.id)}
                                        onChange={() => toggleCampaignSelection(campaign.id)}
                                    />
                                </TableCell>
                                <TableCell className="text-blue-500 hover:underline cursor-pointer "
                                    onClick={() => navigate(`/admin/advertiser/campaign/view?campaign_id=${campaign.id}`)}
                                >
                                    {campaign.name}
                                </TableCell>
                                <TableCell  >{campaign.campaign_assignments?.length || 0}</TableCell>
                                <TableCell  >{campaign.placements?.length || 0}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4">
                <Button
                    onClick={handleDeleteCampaigns}
                    type="button"
                    variant="destructive"
                    disabled={campaignList.length === 0}
                >
                    Delete
                </Button>
            </div>
        </>
    );
};

export default AdvertiserView;
