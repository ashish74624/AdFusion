// components/AdvertiserView.tsx

import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { base_url } from "@/utils/baseUrl";
import React, { useState, useEffect } from "react";
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

    const advertiser_id = searchParams.get("advertiser_id");


    useEffect(() => {
        const fetchAdvertiserData = async () => {
            try {
                const response = await fetch(`${base_url}/advertiser/view?advertiser_id=${advertiser_id}`);
                const data = await response.json();
                setAdvertiser(data.advertiser);
                setCampaigns(data.campaigns);
            } catch (error) {
                console.error("Error fetching advertiser data:", error);
            }
        };

        fetchAdvertiserData();
    }, [searchParams, advertiser_id]);

    // const handleCreateCampaign = () => {
    //     if (!newCampaignName.trim()) return;
    //     const newCampaign: Campaign = {
    //         id: Date.now(),
    //         name: newCampaignName,
    //     };
    //     setCampaigns([...campaigns, newCampaign]);
    //     setNewCampaignName("");
    //     setIsModalOpen(false);
    // };

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
                            <Button>
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
                            <TableRow key={campaign.id} onClick={() => navigate(`/admin/advertiser/campaign/view?campaign_id=${campaign.id}`)} >
                                <TableCell  ></TableCell>
                                <TableCell  >{campaign.name}</TableCell>
                                <TableCell  >{campaign.campaign_assignments?.length || 0}</TableCell>
                                <TableCell  >{campaign.placements?.length || 0}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* <div className="mt-4">
                <button
                    onClick={handleDeleteCampaigns}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                    type="button"
                >
                    <span className="text-xl font-bold">×</span>
                    <span>Delete</span>
                </button>
            </div> */}
        </>
    );
};

export default AdvertiserView;
